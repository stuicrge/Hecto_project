import selenium 
print( selenium.__version__)  # 버전 확인 
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())