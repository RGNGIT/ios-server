class Varling:
    def __init__(self,terms,value,name_ling):
        self.terms = terms
        self.value = value
        self.name_ling = name_ling

        self.aff_for_terms = None
        if not (value  is None):
            self.affilationForTerms()
    def affilationForTerms(self,Number = None):
        #Number = None в виду того,что позже будет необходимо посчитать для различнхы значений
        aff_terms = {}
        if Number is None:
            self.aff_for_terms = aff_terms
            Number = self.value

        for term in self.terms:
            #Получаем все точки x для нашей трапеции
            aff_terms[term] = None


            dots = self.terms[term]['x']

            # Определяем не нулвые точки и ядро
            range_affilation = (dots[0], dots[-1])
            range_core = (dots[1], dots[2])

            if dots[1] <= Number <= dots[2]  :
                aff_terms[term] = 1.
            elif dots[0] <=  Number <= dots[-1]:
                answer = None
                length = 0
                if range_core[0] > Number:
                    length = range_core[0]-range_affilation[0]
                    answer = (Number - range_affilation[0]) / length
                elif range_core[-1] < Number:
                    length = range_affilation[-1] -  range_core[-1]
                    answer = ( range_affilation[-1] - Number ) / length
                aff_terms[term] = round(answer,4)

            else:
                aff_terms[term] = 0.


        return aff_terms





    def __repr__(self):
        data = {key:value for key,value in self.__dict__.items()}
        return f"{data}"