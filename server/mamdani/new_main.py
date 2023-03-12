import json
import copy
from pprint import pprint
import image_graphics as ig
import Rules
import LingVar
import sys


# import requests



# with open("rules.json","w") as f:
#     f.write(requests.get(url = "http://192.168.43.151:8080/api/getRuleList").text)

# считываем термы
with open("terms.json", encoding="UTF-8") as f:
    terms = json.load(f)

# получаем базу с правилами
with open("rules.json") as f:
    rules_json = json.load(f)

if __name__ == "__main__":
    # Получаем переменные
    variables = {var: int(dig) for dig, var in zip(sys.argv[1:], [key for key in terms if key != "Result"]) if
                 dig.isdigit()}
    if len(variables) != 6:
        raise ValueError("Переданы не все переменные")
    show_end = "yes" in sys.argv[1:]


    lingVars = []
    for var in variables:
        lingVars.append(LingVar.Varling(terms = terms[var],value = variables[var],name_ling = var ))

    rules = []

    for rule in rules_json:
        base_rules  = {key:value for key,value in rule.items() if  key not in ("Key","Result")}
        rules.append(Rules.Rule(key = rule["Key"],rule = base_rules,result= rule["Result"]))


    for rule in rules:
        rule.get_status(*lingVars)



    #получаем правила активные правила
    rules = [rule for rule in rules if rule.status > 0]



    dot_result = LingVar.Varling(terms = terms["Result"],value = None,name_ling = "Result")
    end = []
    for rule in rules:
        axes_x = dot_result.ranges_terms[rule.result]['aff']
        for x in axes_x:
            dot_result.value = x
            dot_result.affilation_trapeze()
            y = round(min(dot_result.affilation_terms[rule.result],rule.status),4)
            end.append((x,y))

    end.sort(key = lambda x :x[1] )
    end = {key:value for key,value in end if value > 0}

    #итоговая функция её точки
    x = sorted(end)
    y = [end[key] for key in sorted(end)]



    #Получение итоговой функции
    res = {"ResultFunc": {"x": x, "y": y},"Result":None}

    for_pictures = copy.deepcopy(lingVars)


    for var in lingVars:
        temp_dict = {}
        #"x":[],"y":[]
        for rangs in var.ranges_terms:
            _x = []
            _y = []
            term = rangs


            for x_ in  var.ranges_terms[term]["aff"]:
                _x += [x_]
                var.value = x_
                var.affilation_trapeze()
                _y += [round(var.affilation_terms[term],4)]
            temp_dict[term] = [_x,_y]
        res[var.name_ling] = temp_dict



    up = 0
    down = 0
    for x_, y_ in zip(x, y):
        up += x_ * y_
        down += y_

    try:
        temp = up / down
        res["Result"] = temp
    except:
        res["Result"] = -1 #правило отсутсвует


    # Трассировка!!!

    # pprint(res)
    print(res)



    if show_end:
        for var in for_pictures:
            ig.get_graphic(var)
        ig.get_result(x,y)









    #

