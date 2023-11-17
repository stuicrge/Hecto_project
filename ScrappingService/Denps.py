from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd 

titlelist = []
productlist = []
contentlist = []

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://www.denpsmall.com/goods/goods_view.php?goodsNo=1000000423&crema-product-reviews-1-sort=20")
driver.maximize_window()


action = driver.find_element(By.CSS_SELECTOR, 'body')
time.sleep(2)
action.send_keys(Keys.END)
time.sleep(2)

#리뷰버튼부분이 없음


# 페이지 버튼 수집
page_div = driver.find_element(By.CLASS_NAME, 'pagination')
page_tag = page_div.find_elements(By.TAG_NAME, 'a')

page_num=len(page_tag)

if page_num >= 5:
    page_num = 6

    for i in range(1, page_num):

        # 페이지 내용 스크래핑
        bs = BeautifulSoup(driver.page_source, 'html.parser')
        product_review = bs.find(class_="reviews_cont")
        product_reviews = product_review.select('#review_61928 > div.review_list_v2__review_lcontent > div > div.review_list_v2__content_section > div > div.review_list_v2__content.review_content__collapsed > div > div > div.review_list_v2__message.js-collapsed-review-content.js-translate-text')

        print(product_reviews)

        #페이지 버튼 클릭
        wait = WebDriverWait(driver, 10)
        page_button = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'pagination__button.pagination__button--next')))      
        time.sleep(4)
        page_button.click()
        time.sleep(4)

        #페이지 내용 스크래핑
        for j in range(0, len(product_reviews)):

            content_element = product_reviews[j].select_one('#review_61928 > div.review_list_v2__review_lcontent > div > div.review_list_v2__content_section > div > div.review_list_v2__content.review_content__collapsed > div > div > div.review_list_v2__message.js-collapsed-review-content.js-translate-text')
            product_element = driver.find_element(By.XPATH, f'//*[@id="frmView"]/div/div[1]/div[1]/h3')

            try:
                content = content_element.text
                product_name = product_element.text
            
            except AttributeError:
                continue
            
            
            print(content)
            #리뷰내용, 제품리뷰 리스트 추가
            contentlist.append(content)
            productlist.append(product_name)
                            
print("finish")
