from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import pandas as pd 
import datetime as dt
from dateutil.relativedelta import relativedelta
from apscheduler.schedulers.blocking import BlockingScheduler
from insertDB import insertDB

import sys
sys.path.append(r'C:\ReviewService\GptApiService')

from gpt import gpt
from updateDB import updateDB

# csv파일에 담을 제품명,후기제목,후기내용,등록일자 리스트
productlist = []
titlelist = []
contentlist = []
datelist = []

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://web.ttobakcare.com/goods/catalog?code=0001&btn_no=001")
#driver.maximize_window()

#스크래핑 서비스
def reviewScrapping(before_date):
    action = driver.find_element(By.CSS_SELECTOR, 'body')
    time.sleep(2)
    action.send_keys(Keys.END)
    time.sleep(2)
   
    wait = WebDriverWait(driver, 10)  # 최대 10초 기다림
    review_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="traceLogTarget"]/div[2]/div/div/button[2]')))
    review_button.click()
    time.sleep(2)

    # 리뷰가 없을 경우
    empty = driver.find_element(By.CLASS_NAME, 'board-list-wrap.empty')
    print(empty.text)
    if(empty.text == "등록된 게시글이 없습니다."):
        return

    product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text
    print(product_name)
    
    loop = True
    while loop:

        bs = BeautifulSoup(driver.page_source, 'html.parser')
        review = bs.find(class_="board-list")
        reviews = review.find_all("li")

        for i in range(1, len(reviews)-1):
            date = dt.datetime.strptime(reviews[i].select_one('.board-list-date').text, "%Y-%m-%d").date()

            time.sleep(3)
            
            if date < before_date:
                loop = False
                break

            try:
                title = reviews[i].select_one('.board-list-title > span').get_text()
                print(title)
                content = reviews[i].select_one('.board-list-content > p').get_text(strip=True)
                print(content)
                
                print(date)

            except AttributeError as a :
                continue
            
            productlist.append(product_name)
            titlelist.append(title)
            contentlist.append(content) 
            datelist.append(date)
        
        try:
            paging_button = driver.find_element(By.CLASS_NAME, 'next')
            time.sleep(2)
            if paging_button.is_displayed():
                time.sleep(2)
                paging_button.click()
                time.sleep(2)
        except NoSuchElementException:       
            # if paging_button.is_displayed()==False:
            time.sleep(2)
            return

def main():

    # 상품 목록 스크랩 (전체 제품 스크랩)
    product_ul = driver.find_element(By.CSS_SELECTOR, 'ul[data-v-0cda2236]')
    product_li = product_ul.find_elements(By.TAG_NAME, 'li')

    now_date = dt.datetime.now()
    before_one_day = (now_date + relativedelta(days=-1)).date() # 하루 전

    # 페이지 이동
    for i in range(len(product_li)):
        # 각기 다른 상품 클릭 반복
        products = driver.find_element(By.XPATH, f'//*[@id="list0001"]/div/ul/li[{i+1}]/div/span[2]')
        print(i+1)

        try:
            #actions.perform()
            time.sleep(3)
            products.click()
            time.sleep(3)
            reviewScrapping(before_one_day)
        except Exception as e:
            #print('Error Message:', e) 
            ActionChains(driver).move_to_element(products)
            #rect = products.rect
            #print(f"rect={rect}")
            time.sleep(3)
            products.click()
            time.sleep(3)
            reviewScrapping(before_one_day)
        finally:
            print("end")
        
        time.sleep(3)
        driver.back()         
        time.sleep(3) 
    
    driver.quit()

    # 스크래핑한 데이터 -> 데이터프레임 -> csv파일 -> db table에 저장
    data = {"name":productlist, "title":titlelist, "content":contentlist, "date":datelist}

    df = pd.DataFrame(data)

    if not df.empty:
        print(df.head(10))
        
        df.to_csv("ttobakcare.csv", encoding="utf-8-sig")
        
        csv_len = len(df)
        insertDB()
        gpt(csv_len)
        updateDB(csv_len)
    else:
        print("DataFrame is empty. No data to save.")

# 스케줄러
sched = BlockingScheduler(timezone='Asia/Seoul')

sched.add_job(main, 'cron', hour='12',minute='0')  

print('sched before~')
try:
    # 스케줄러 시작
    sched.start()
except (KeyboardInterrupt, SystemExit):
    # Ctrl+C 또는 다른 종료 이벤트를 감지하면 스케줄러 종료
    sched.shutdown()


