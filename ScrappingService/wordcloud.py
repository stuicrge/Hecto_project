import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS

text="""
28일 한국거래소 자료를 보면, 10월 들어 코스피는 315.92포인트(13.48%) 하락했다. 
코스닥지수도 같은 기간 159.20포인트(19.36%) 떨어졌다. 코스피 시가총액은 209조8510억원, 
코스닥 시가총액은 51조5290억원 줄었다. 한 달 새 국내 주식시장에서 투자자들이 보유한 주식 가치가 
261조3800억원 쪼그라든 것이다. 
이 같은 급락세는 2008년 10월 금융위기(-23.13%)나 
1997년 10월 외환위기(-27.25%) 때만큼은 아니지만 월간 기준으로 보면 2008년 10월 이후 가장 많이 하락했다.
다음달 한국은행의 기준금리 인상 가능성이 높게 점쳐지는 등 증시를 둘러싼 국내 사정도 녹록지 않다. 
NH투자증권은 이번주 코스피 밴드를 1960~2150으로 기존 전망치보다 크게 낮췄다. 단기적으로 저가 매수세가 유입될 수는 있지만 상승폭은 제한될 것으로 전망된다. 김병연 NH투자증권 연구원은 “현 가격 수준에서는 언제라도 기술적 반등이 나타날 수 있지만 상승 동력 부재로 상승폭은 제한될 것”이라고 말했다.
"""
spwords=set(STOPWORDS) # 기본적으로 많이 쓰는 단어 (제외할 단어)
                       # ex)'should', "wouldn't", "how's", "i'm", 'then', etc ..
spwords.add('10월')    #제외하고 싶은 단어 추가

# 워드 클라우드를 설정합니다.
wordcloud = WordCloud(max_font_size=200,
                   font_path='c:/Windows/fonts/malgun.ttf', #한글이 있기 때문에 한글폰트 사용( # Windows OS)
               #   font_path = "/System/Library/fonts/AppleSDGothicNeo.ttc",  # Mac OS
                      stopwords=spwords,   #기본적으로 많이 쓰는 단어는 제외
                      background_color='#FFFFFF',
                      random_state=50, #워드클라우드 모양 결정
                      width=1200,
                      height=800).generate(text)

plt.figure(figsize=(10,8))
plt.imshow(wordcloud)
plt.tight_layout(pad=0)
plt.axis('off')

plt.savefig('wordcloud_image1.png', bbox_inches='tight') # 파일로 저장
plt.show()