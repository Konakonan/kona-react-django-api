import requests
from bs4  import BeautifulSoup

res=requests.get("https://supu-test-app.firebaseapp.com/")
soup=BeautifulSoup(res.text,"html.parser")

table_tag=soup.find_all("td",class_="title")

xx=[x.text for x in table_tag]

for i in xx:
    print(i)


