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

element_to_hover_over = driver.find_element(By.CLASS_NAME, 'filter_sort_basic menu')

actions = ActionChains(driver)
actions.move_to_element(element_to_hover_over)
actions.perform()

actions.move_to_element_with_offset(element_to_hover_over, 0, 700)
time.sleep(7)                            


        # 페이지 내용 스크래핑
bs = BeautifulSoup(driver.page_source, 'html.parser')
product_reviews = bs.find('div', {'class': 'review_list_v2__message.js-collapsed-review-content.js-translate-text'})
print(product_reviews)



print("finish")
