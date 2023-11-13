from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd 


productlist = []
titlelist = []
contentlist = []

# 웹 드라이버 초기화 
driver = webdriver.Chrome()
driver.get("https://web.ttobakcare.com/goods/catalog?code=0001&btn_no=001")

# 상품 스크롤을 위한 action 선언
# 상품 목록 스크랩 (전체 제품 스크랩)
product_ul = driver.find_element(By.CSS_SELECTOR, 'ul[data-v-0cda2236]')
product_li = product_ul.find_elements(By.TAG_NAME, 'li')

# 기본 사이즈를 설정합니다.
#driver.set_window_size(1000,700)

# 화면의 실제 사이즈로 변경
#totalWidth = driver.execute_script("return document.body.offsetWidth")
#totalHeight = driver.execute_script('return document.body.parentNode.scrollHeight')
#driver.set_window_size(totalWidth, totalHeight)
driver.maximize_window()

#스크래핑 서비스
def reviewScrapping():
    action = driver.find_element(By.CSS_SELECTOR, 'body')
    time.sleep(2)
    action.send_keys(Keys.END)
    time.sleep(2)

    #review_button = driver.find_element(By.XPATH, '//*[@id="traceLogTarget"]/div[2]/div/div/button[2]')
    
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

    page_div = driver.find_element(By.CLASS_NAME, 'board-paging')
    page_ul = page_div.find_elements(By.CSS_SELECTOR, 'ul')

    page_num = len(page_ul)

    if page_num >= 10:
        page_num = 10

    for _ in range(0, page_num-1):

        bs = BeautifulSoup(driver.page_source, 'html.parser')

        product_review = bs.find(class_="board-list")
        product_reviews = product_review.find_all("li")
        
        paging_button = driver.find_element(By.CLASS_NAME, 'next')
        paging_button.click()
        time.sleep(2)


        for j in range(0, len(product_reviews)-1):

            title_element = product_reviews[j].select_one('.board-list-title > span')
            content_element = product_reviews[j].select_one('.board-list-content > p')
            product_element = driver.find_element(By.CLASS_NAME, 'goods-name')

            try:
                title = title_element.text
                content = content_element.text
                product_name = product_element.text
            except AttributeError:
                continue

            print(title)
                
            productlist.append(product_name)
            titlelist.append(title)
            contentlist.append(content)           


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

data = {"name":productlist, "title":titlelist, "content":contentlist}
df = pd.DataFrame(data)
print(df.head(104))

df.to_csv("ttobakcare.csv", encoding = "utf-8-sig")

driver.quit()