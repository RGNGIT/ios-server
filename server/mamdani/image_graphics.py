import matplotlib
import matplotlib.pyplot as plt
from Rules import Rule



def get_graphic(rules,plt = plt):

    for rule in rules:
        fig = plt.figure(f"idRule_{rule.key}")

        axes = fig.add_subplot(111)

        axes.grid()

        axes.set_title(rule.result)
        axes.plot(rule.x, rule.y,marker = "h",linewidth = 0.3)
        fig.savefig(f"idRule_{rule.key}")





def get_result(x,y,plt = plt):

    fig = plt.figure("Итог")
    axes = fig.add_subplot(111)


    axes.plot(x,y)
    axes.set_title("Итог")
    fig.savefig("result")

