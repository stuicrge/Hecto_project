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
from apscheduler.schedulers.blocking import BlockingScheduler



# csv파일에 담을 제품명,후기제목,후기내용,등록일자 리스트
productlist = []
titlelist = []
contentlist = []
datelist = []

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://web.ttobakcare.com/goods/catalog?code=0001&btn_no=001")

# 상품 스크롤을 위한 action 선언
# 상품 목록 스크랩 (전체 제품 스크랩)
product_ul = driver.find_element(By.CSS_SELECTOR, 'ul[data-v-0cda2236]')
product_li = product_ul.find_elements(By.TAG_NAME, 'li')
driver.maximize_window()

#스크래핑 서비스
def reviewScrapping():
    action = driver.find_element(By.CSS_SELECTOR, 'body')
    time.sleep(2)
    action.send_keys(Keys.END)
    time.sleep(2)
   
    wait = WebDriverWait(driver, 10)  # 10 seconds maximum wait time
    review_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="traceLogTarget"]/div[2]/div/div/button[2]')))
    review_button.click()
    time.sleep(2)

#    if product_name is not None:
#        print("상품 이름: " + product_name.text)
#    else:
#        print("상품 이름을 찾을 수 없습니다.")    
    empty = driver.find_element(By.CLASS_NAME, 'board-list-wrap.empty')
    print(empty.text)
    if(empty.text == "등록된 게시글이 없습니다."):
        return
#    page_div = driver.find_element(By.CLASS_NAME, 'board-paging')
#    page_ul = page_div.find_elements(By.CSS_SELECTOR, 'ul')

#페이지 갯수 
    loop = True
    while loop:

        bs = BeautifulSoup(driver.page_source, 'html.parser')
        product_review = bs.find(class_="board-list")
        product_reviews = product_review.find_all("li")

        # Wait for the element to be present
        
        paging_button = driver.find_element(By.CLASS_NAME, 'next')
        # Now click on the element
        time.sleep(2)
        paging_button.click()
        time.sleep(2)

        now_date = dt.datetime.now()
        before_one_year = now_date + relativedelta(years=-1)

        for product_review in product_reviews:

            try:

                title = product_review.select_one('.board-list-title > span').get_text()  
                print(title)
                content = product_review.select_one('.board-list-content > p').get_text()
                print(content)
               
                product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text  


                date = dt.datetime.strptime(product_review.select_one('.board-list-date').text, "%Y-%m-%d")
                print(date)

            except AttributeError as a :
                continue
            
            if date < before_one_year:
                loop = False
                break

            productlist.append(product_name)
            titlelist.append(title)
            contentlist.append(content) 
            datelist.append(date)          

# 여기까지 1년전 스크래핑

# 이제 업데이트 되는 스크래핑
def ScheduleScrapping():
    action = driver.find_element(By.CSS_SELECTOR, 'body')
    time.sleep(2)
    action.send_keys(Keys.END)
    time.sleep(2)
   
    wait = WebDriverWait(driver, 10)  # 10 seconds maximum wait time
    review_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="traceLogTarget"]/div[2]/div/div/button[2]')))
    review_button.click()
    time.sleep(2)

#    if product_name is not None:
#        print("상품 이름: " + product_name.text)
#    else:
#        print("상품 이름을 찾을 수 없습니다.")    
    empty = driver.find_element(By.CLASS_NAME, 'board-list-wrap.empty')
    print(empty.text)
    if(empty.text == "등록된 게시글이 없습니다."):
        return
#    page_div = driver.find_element(By.CLASS_NAME, 'board-paging')
#    page_ul = page_div.find_elements(By.CSS_SELECTOR, 'ul')


#   스크래핑 반복문
    loop = True
    while loop:

        bs = BeautifulSoup(driver.page_source, 'html.parser')
        product_review = bs.find(class_="board-list")
        product_reviews = product_review.find_all("li")

        # Wait for the element to be present
        
        paging_button = driver.find_element(By.CLASS_NAME, 'next')
        # Now click on the element
        time.sleep(2)
        paging_button.click()
        time.sleep(2)

        #이게 이제 날짜설정하는 거
        now_date2 = dt.datetime.now()
        before_one_day = now_date2 + relativedelta(days=-1)


        for product_review in product_reviews:

            try:

                title = product_review.select_one('.board-list-title > span').get_text()  
                print(title)
                content = product_review.select_one('.board-list-content > p').get_text()
                print(content)
               
                product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text  

                date = dt.datetime.strptime(product_review.select_one('.board-list-date').text, "%Y-%m-%d")
                print(date)

            except AttributeError :
                continue

            
            if date<before_one_day :
                loop = False
                break

            productlist.append(product_name)
            titlelist.append(title)
            contentlist.append(content) 
            datelist.append(date)  


def main():
#여기서부터 페이지이동
    for i in range(len(product_li)):
    
    #x_path = '//*[@id="list0001"]/div/ul/li[' + str(i+1) + ']/div/span[2]'
    #products = driver.find_element(By.XPATH, x_path)
    # 각기 다른 상품 클릭 반복
        products = driver.find_element(By.XPATH, f'//*[@id="list0001"]/div/ul/li[{i+1}]/div/span[2]')
        print(i+1)    
    try:
        #actions.perform()
        time.sleep(4)
        products.click()
        time.sleep(4)
        reviewScrapping()
    except Exception as e:
        #print('Error Message:', e) 
        actions = ActionChains(driver).move_to_element(products)
        #rect = products.rect
        #print(f"rect={rect}")
        time.sleep(4)
        products.click()
        time.sleep(4)
        reviewScrapping()
    finally:
        print("end")
    
    time.sleep(4)
    driver.back()         
    time.sleep(4)  

print("wow~~~")

main()
#data = {"name":productlist, "title":titlelist, "content":contentlist}
#df = pd.DataFrame(data)
#print(df.head(104))

#df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")
driver.quit()