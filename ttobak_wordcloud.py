import matplotlib.pyplot as plt

from wordcloud import WordCloud, STOPWORDS
from collections import Counter

from konlpy.tag import Okt

from package.dbconn import mysqlDbClose,mysqlDbConnection

dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
cursor = dbConn.cursor()

query = "SELECT content FROM ttobak_review"
cursor.execute(query)

datas = cursor.fetchall()

okt = Okt()
morphemeResult = []
for data in datas:
    morphemeList = okt.pos(data[0])
    for p in morphemeList:
        if(p[1] == 'Noun'): # 형태소 분석 후 명사와 동사만 추출
            morphemeResult.append(p[0])
morphemeResult =[ n for n in morphemeResult if len(n) > 1]
print(morphemeResult)

dbConn.commit() 
cursor.close()
mysqlDbClose(dbConn)

count=Counter(morphemeResult)      #단어별 빈도수를 가진 딕셔너리를 만들어줌.
print(count)
tags=count.most_common(100)  #가장 많이 나타나는 100개
print(tags)

spwords=set(STOPWORDS) ## 기본적으로 많이 쓰는 단어
spwords.add('또박') ##  제외하고 싶은 단어 추가
wordcloud = WordCloud(max_font_size=200,
								font_path='c:/Windows/fonts/malgun.ttf',
                stopwords=spwords,background_color='#FFFFFF',
                max_words = 2000,
                colormap="spring_r",
                width=1200,height=800).generate_from_frequencies(dict(tags))
plt.figure(figsize=(10,8))
plt.imshow(wordcloud)
plt.tight_layout(pad=0)
plt.axis('off')
plt.savefig('wordcloud_image.png', bbox_inches='tight')
plt.show()