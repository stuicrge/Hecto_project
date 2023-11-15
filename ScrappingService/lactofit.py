from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd 


#productlist = []
#titlelist = []
#contentlist = []

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

page_div = driver.find_element(By.CLASS_NAME, 'paging.reviewPage')
page_tag = page_div.find_elements(By.TAG_NAME, 'a')
page_num=len(page_tag)


if page_num >= 20:
    
    page_num = 20

    for i in range(0, page_num-1):


        bs = BeautifulSoup(driver.page_source, 'html.parser')
        product_review = bs.find(class_="rv_info")
        product_reviews = product_review.find_all("div")


        page_button = driver.find_element(By.XPATH,f'//*[@id="prdDetail"]/div[1]/div/div/div[2]/div/div[3]/div[3]/a[{i+1}]')        
        page_button.click()
        time.sleep(2)


        for j in range(0, len(product_reviews)-1):

            content_element = product_reviews[j].select_one('.rv_txt > p')
            product_element = driver.find_element(By.XPATH, f'//*[@id="contents"]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/h1')

            try:
                content = content_element.text
                product_name = product_element.text
            except AttributeError:
                continue
            
            print(content)
            print(product_name)
                
print("finish")
#driver.quit()