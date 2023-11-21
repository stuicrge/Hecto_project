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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

# csv파일에 담을 제품명,후기제목,후기내용,등록일자 리스트
productlist = []
titlelist = []
contentlist = []
datelist = []


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
<<<<<<< Updated upstream

    # 리뷰가 없을 경우
=======
>>>>>>> Stashed changes
    empty = driver.find_element(By.CLASS_NAME, 'board-list-wrap.empty')
    print(empty.text)
    if(empty.text == "등록된 게시글이 없습니다."):
        empty_product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text
        productlist.append(empty_product_name)
        titlelist.append(None)
        contentlist.append(None)
        datelist.append(None)
        return

    loop = True
    while loop:

        bs = BeautifulSoup(driver.page_source, 'html.parser')
        review = bs.find(class_="board-list")
        reviews = review.find_all("li")
        
        paging_button = driver.find_element(By.CLASS_NAME, 'next')
        time.sleep(2)
        paging_button.click()
        time.sleep(2)

        for r in reviews:

            try:
                product_name = bs.find(class_='goods-name').text
                print(product_name)
                title = r.select_one('.board-list-title > span').get_text()
                print(title)
                content = r.select_one('.board-list-content > p').get_text().replace("\n", "")
                print(content)
<<<<<<< Updated upstream
                date = dt.datetime.strptime(r.select_one('.board-list-date').text, "%Y-%m-%d")
=======
               
                product_name = driver.find_element(By.CLASS_NAME, 'goods-name').text  

                date = dt.datetime.strptime(product_review.select_one('.board-list-date').text, "%Y-%m-%d")
>>>>>>> Stashed changes
                print(date)

            except AttributeError as a :
                continue
            
            if date < before_date:
                loop = False
                break

            productlist.append(product_name)
            titlelist.append(title)
            contentlist.append(content) 
<<<<<<< Updated upstream
            datelist.append(date) 

def main():

    # 상품 목록 스크랩 (전체 제품 스크랩)
    product_ul = driver.find_element(By.CSS_SELECTOR, 'ul[data-v-0cda2236]')
    product_li = product_ul.find_elements(By.TAG_NAME, 'li')

    now_date = dt.datetime.now()
    before_one_year = now_date + relativedelta(years=-1) # 1년 전

    # 페이지 이동
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
            reviewScrapping(before_one_year)
        except Exception as e:
            #print('Error Message:', e) 
            ActionChains(driver).move_to_element(products)
            #rect = products.rect
            #print(f"rect={rect}")
            time.sleep(4)
            products.click()
            time.sleep(4)
            reviewScrapping(before_one_year)
        finally:
            print("end")
=======
            datelist.append(date)          

# 여기까지 1년전 스크래핑

#여기서부터 페이지이동
for i in range(len(product_li)):
    # 각기 다른 상품 클릭 반복
    products = driver.find_element(By.XPATH, f'//*[@id="list0001"]/div/ul/li[{i+1}]/div/span[2]')
    print(i+1)    
    try:
        
        time.sleep(4)
        products.click()
        time.sleep(4)
        reviewScrapping()
    except Exception as e:
        
        actions = ActionChains(driver).move_to_element(products)

        time.sleep(4)
        products.click()
        time.sleep(4)
        reviewScrapping()
    finally:
        print("end")
>>>>>>> Stashed changes
    
        time.sleep(4)
        driver.back()         
        time.sleep(4)  

if __name__ == '__main__':
    main()

<<<<<<< Updated upstream
data = {"name":productlist, "title":titlelist, "content":contentlist, "date":datelist}
df = pd.DataFrame(data)
print(df.head(104))

df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")
=======
#data = {"name":productlist, "title":titlelist, "content":contentlist}
#df = pd.DataFrame(data)
#print(df.head(104))

#df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")


#df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")
>>>>>>> Stashed changes
driver.quit()