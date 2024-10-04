import pandas as pd
import japanize_matplotlib 
import matplotlib.pyplot as plt

df_1=pd.read_csv("./data/平均気温.csv")
#print(df_1)

df_1.plot(x="月",y="平均気温",marker="o")

plt.grid()
plt.ylabel("度",rotation=0)
plt.title("2021年の平均気温")
#plt.show()

plt.savefig("グラフ.png")