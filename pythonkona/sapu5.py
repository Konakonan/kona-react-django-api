from pathlib import Path
path=Path("./data")
g=list(path.glob("**/*.txt"))


def read_numbers(file):
    with open(file) as f:
        numbers=set([j.strip() for j in f.readlines()])
    return numbers


aaaa=read_numbers(g[0])

for x in g[1:]:
   numbers=read_numbers(x)
   aaaa=aaaa & numbers
print(aaaa)
   
 