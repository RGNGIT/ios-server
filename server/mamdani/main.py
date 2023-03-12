import json
import copy
from pprint import pprint
# import image_graphics as ig
import Rules
import LingVar
import sys


# import requests



# with open("rules.json","w") as f:
#     f.write(requests.get(url = "http://192.168.43.151:8080/api/getRuleList").text)

# считываем термы
Path = ''

if(len(sys.argv) > 7):
    Path = "%s/" % (sys.argv[7])

with open("%sterms.json" % (Path), encoding="cp1251") as f:
    terms = json.load(f)

# получаем базу с правилами
with open("%srules.json" % (Path), encoding="cp1251") as f:
    rules_json = json.load(f)

#Загружаем точки
with open("%sdots.json" % (Path), encoding="cp1251") as f:
    dots = json.load(f)

def checkNumber(value):
    try:
        float(value)
        return True
    except:
        return False



if __name__ == "__main__":
    # Получаем переменные  в формате nameLingVar:valueNumber

    variables = {var: float(dig) for dig, var in zip(sys.argv[1:], [key for key in terms if key != "Result"]) if
                 checkNumber(dig)}

    show_end = "yes" in sys.argv[1:]




    #Инициализация наших входных лингвистических переменных
    lingVars = []
    for nameLingVar,valueNumber in variables.items():
        lingVars.append(LingVar.Varling(name_ling = nameLingVar,value = valueNumber,terms = dots[nameLingVar]))



    #К этому моменту лингв переменны считаны и посчитаны принадлежности к термам


    # print(lingVars[0])
    #Создаем объекты правила
    rules = []
    for rule in rules_json:
        base_rules  = {key:value for key,value in rule.items() if  key not in ("Key","Result")}
        rules.append(Rules.Rule(key = rule["Key"],rule = base_rules,result= rule["Result"]))


    for rule in rules:
        rule.get_status(*lingVars)

    rules = [rule for rule in rules if rule.status > 0]

    dot_result = LingVar.Varling(terms = dots["Result"],value = None,name_ling = "Result")
    # print(dot_result)


   #Сейчас посчитаем функции приндледности правил
    for rule in rules:

        _y = [] # значения f(x)
        for x in range(1,100+1):
            _y += [min(dot_result.affilationForTerms(x)[rule.result],rule.status)]
        rule.y = _y
        rule.x = list(range(1,100+1))

    # if rules:
    #     ig.get_graphic(rules)


    #Объединение
    x_coords = list(range(1,100+1))
    y_coords = []
    for index in range(1,100+1):
        mx = 0
        for rule in rules:
            mx = max(mx,rule.y[index-1])
        y_coords.append(mx)



    result = {"Result":None,"Result_term":None}
    up = 0
    down = 0

    for x_, y_ in zip(x_coords, y_coords):
        up += x_ * y_
        down += y_

    try:
        temp = up / down
        # print(f"Количество активных правил: {len(rules)}")
        # print(temp)

        result["Result"] = temp

        tmp = dot_result.affilationForTerms(temp)
        tmp = sorted(tmp,key = lambda x:tmp[x])[-1]
        result["Result_term"] = tmp
        result["ResultFunc"]= {"x": x_coords, "y": y_coords}

        for rule in rules:
            result[f"RuleId{rule.key}"] = [rule.x,rule.y]
        print(result)
    except Exception as f:
        # res["Result"] = -1 #правило отсутсвует
        ...
        print(-1,f)
    # if x_coords and y_coords:
    #     ig.get_result(x_coords,y_coords)







