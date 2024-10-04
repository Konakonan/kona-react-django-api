sucres={"国語":87,"数学":86,"英語":70,"理科":73,"社会":80}

def avglist(a:dict):
    total=int(a["国語"])+int(a["数学"])+int(a["英語"])
    total2=total/3
    return total2

print(avglist(sucres))