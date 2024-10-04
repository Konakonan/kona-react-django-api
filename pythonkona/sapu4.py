from pathlib import Path
path=Path("./data")
div_g=path.iterdir()

g=path.glob("**/*.csv")
for x in g:
    print(x.name)