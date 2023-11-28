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

# 타사 제품 크롤링 서비스

productlist = []
contentlist = []
datelist = []

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://ckdhcmall.co.kr/prdView.do?prdCode=G2303161200_0051")
driver.maximize_window()


action = driver.find_element(By.CSS_SELECTOR, 'body')
time.sleep(2)
action.send_keys(Keys.END)
time.sleep(2)


#리뷰 버튼 클릭
wait = WebDriverWait(driver, 10)  # 10 seconds maximum wait time
review_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="reviewTab"]/a')))
review_button.click()
time.sleep(4)

now_date = dt.datetime.now()
before_one_year = (now_date + relativedelta(years=-1)).date() 


#페이지 넘기는 버튼 스크랩
page_div = driver.find_element(By.CLASS_NAME, 'paging.reviewPage')
page_tag = page_div.find_elements(By.TAG_NAME, 'a')

# 페이지 버튼 길이
page_num=len(page_tag)

i = 0
loop = True
while loop:

    for i in range(1, page_num):
        # 페이지 내용 스크래핑
        bs = BeautifulSoup(driver.page_source, 'html.parser')
        product_review = bs.find(class_="revw_list_area")
        product_reviews = product_review.find_all("div","rv_info")
        product_date = product_review.find_all("div", "write_info")
        print(i)

        #페이지 버튼 클릭
        page_button = driver.find_element(By.XPATH,f'//*[@id="prdDetail"]/div[1]/div/div/div[2]/div/div[3]/div[3]/a[{i+1}]')        
        time.sleep(4)
        page_button.click()
        time.sleep(4)

    for j in range(0, len(product_reviews)):
        date_element = product_date[j].select_one('.txt > p')

    # Check if date_element is not None before attempting to access .text
    if date_element:
        date = dt.datetime.strptime(date_element.text, "%Y.%m.%d").date()
    else:
        # Handle the case where date_element is None
        print("Date element not found.")
        continue

    if date < before_one_year:
        loop = False
        break

    try:
        content = product_reviews[j].select_one('.rv_txt > p').get_text()
        print(content)
        product = driver.find_element(By.XPATH, f'//*[@id="contents"]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/h1').get_text()
        print(product)
        print(date)
    except AttributeError:
        continue
    # 리뷰내용, 제품리뷰 리스트 추가
    contentlist.append(content)
    productlist.append(product)
    datelist.append(date)

                            
print("finish")


data = {"name":productlist,"content":contentlist,"date":datelist}
df = pd.DataFrame(data)
print(df.head(100))

df.to_csv("lactofit.csv", encoding = "utf-8-sig")
driver.quit()