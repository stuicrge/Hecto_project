from selenium import webdriver
#from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
#from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
#from selenium.webdriver.support.ui import WebDriverWait
#from selenium.webdriver.support import expected_conditions as EC
import pandas as pd 
import datetime as dt
from dateutil.relativedelta import relativedelta
from apscheduler.schedulers.blocking import BlockingScheduler
import ttobakcare as tto

sched = BlockingScheduler(timezone='Asia/Seoul')

def main():
    # csv파일에 담을 제품명,후기제목,후기내용,등록일자 리스트
    productlist = []
    titlelist = []
    contentlist = []
    datelist = []

    # 웹 드라이버 초기화 
    driver = webdriver.Chrome()
    driver.get("https://web.ttobakcare.com/goods/catalog?code=0001&btn_no=001")

    driver.maximize_window()

    # 상품 목록 스크랩 (전체 제품 스크랩)
    product_ul = driver.find_element(By.CSS_SELECTOR, 'ul[data-v-0cda2236]')
    product_li = product_ul.find_elements(By.TAG_NAME, 'li')

    now_date = dt.datetime.now()
    before_one_day = now_date + relativedelta(days=-1) # 하루 전

    # 페이지 이동
    for i in range(len(product_li)):
        # 각기 다른 상품 클릭 반복
        products = driver.find_element(By.XPATH, f'//*[@id="list0001"]/div/ul/li[{i+1}]/div/span[2]')
        print(i+1)

        try:
            #actions.perform()
            time.sleep(4)
            products.click()
            time.sleep(4)
            tto.reviewScrapping(before_one_day)
        except Exception as e:
            #print('Error Message:', e) 
            ActionChains(driver).move_to_element(products)
            #rect = products.rect
            #print(f"rect={rect}")
            time.sleep(4)
            products.click()
            time.sleep(4)
            tto.reviewScrapping(before_one_day)
        finally:
            print("end")
        
        time.sleep(4)
        driver.back()         
        time.sleep(4) 
    data = {"name":productlist, "title":titlelist, "content":contentlist, "date":datelist}
    df = pd.DataFrame(data)
    print(df.head(104))

    df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")
    driver.quit()

sched.add_job(main, 'cron', hour='16',minute='15')  

print('sched before~')
try:
    # 스케줄러 시작
    sched.start()
except (KeyboardInterrupt, SystemExit):
    # Ctrl+C 또는 다른 종료 이벤트를 감지하면 스케줄러 종료
    sched.shutdown()
