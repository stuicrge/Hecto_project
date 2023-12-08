from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd 
import datetime as dt
from dateutil.relativedelta import relativedelta
from selenium.common.exceptions import NoSuchElementException
import base64
#from insertDB import insertDB

# csv파일에 담을 제품명,후기제목,후기내용,등록일자,이미지 리스트
productlist1 = [] # ttobakcare.csv
titlelist = []
contentlist = []
datelist = []

productlist2 = [] # ttobakcare_image.csv
imagelist = [] 

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://web.ttobakcare.com/goods/catalog?code=0001&btn_no=001")

driver.maximize_window()

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
        empty_product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text
        productlist1.append(empty_product_name)
        titlelist.append(None)
        contentlist.append(None)
        datelist.append(None)
        imagelist.append(None)
        return

    product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    image = bs.select_one("img[data-v-ae438176]")

    print(product_name)

    productlist2.append(product_name)
    imagelist.append(image["src"])
    
    loop = True
    while loop:

        bs = BeautifulSoup(driver.page_source, 'html.parser')
        review = bs.find(class_="board-list")
        reviews = review.find_all("li")


        for i in range(1, len(reviews)-1):    
            date = dt.datetime.strptime(reviews[i].select_one('.board-list-date').text, "%Y-%m-%d").date()
            print(date)

            if date < before_date:
                loop = False
                break

            try:
                title = reviews[i].select_one('.board-list-title > span').get_text()
                print(title)
                content = reviews[i].select_one('.board-list-content > p').get_text(strip=True)
                print(content)

            except AttributeError as a :
                continue
            
            productlist1.append(product_name)
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
    before_one_year = (now_date + relativedelta(years=-1)).date() # 1년 전

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
            reviewScrapping(before_one_year)
        except Exception as e:
            #print('Error Message:', e) 
            ActionChains(driver).move_to_element(products)
            #rect = products.rect
            #print(f"rect={rect}")
            time.sleep(3)
            products.click()
            time.sleep(3)
            reviewScrapping(before_one_year)
        finally:
            print("end")
    
        time.sleep(3)
        driver.back()         
        time.sleep(3) 
    
    driver.quit()

main()

# 스크래핑한 데이터 -> 데이터프레임 -> csv파일 -> db table에 저장
data1 = {"name":productlist1, "title":titlelist, "content":contentlist, "date":datelist}
data2 = {"name":productlist2, "image":imagelist}

df1 = pd.DataFrame(data1)
df2 = pd.DataFrame(data2)
print(df1.head(10))
print(df2.head(10))

df1.to_csv("ttobakcare.csv", encoding = "utf-8-sig")
df2.to_csv("ttobakcare_image.csv", encoding = "utf-8-sig")
#insertDB()
