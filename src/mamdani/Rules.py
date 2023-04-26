from LingVar import Varling
class Rule:
    def __init__(self,key,rule,result):
        self.rule = rule
        self.key = key
        self.result = result
        self.status = 1
        self.x = []
        self.y = []



    def get_status(self,*lingvars):
        #получаем истинность одзаключений правила
        for var in lingvars:
            # name var.name_ling var.aff_for_terms[self.rule[var.name_ling]]
            self.status = min(self.status,var.aff_for_terms[self.rule[var.name_ling]])

    # def get_coords_for_graphic(self):

    def __repr__(self):
        return f'''id:{self.key}  status:{self.status:.3f}
'''
