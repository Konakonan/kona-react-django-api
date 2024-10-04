import pandas as pd
from pathlib import Path

path =Path("./data")
g=path.glob("**/*.csv")

for i in g:
    print(i.name)
    
    
df_1=pd.read_csv("./data/名前.csv")
df_2=pd.read_csv("./data/職業.csv")

#print(df_1)
#print(df_2)

df_new=pd.merge(df_1,df_2,on="user_id")
print(df_new)

df_new.to_csv("df_new.csv",index=False)