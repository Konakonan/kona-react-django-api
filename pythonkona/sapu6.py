import re 

with open("./data/app.log",encoding="utf8") as f :
    logs=[x.strip() for x in f.readlines()] 
    
for i in logs:
    m=re.match(r"\d{4}-\d{2}-\d{2} 22:\d{2}:\d{2},\d{3} \[(WARNING|ERROR)\] ",i)
    
    if m:
        print(i)
