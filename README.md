# Эндпоинты

## GET

### Метод (GET): 'api/getTopicList'
* Возвращает: [{Key, Name, TName}...] 
    * Key - ключ теста в бд
    * Name - название теста
    * TName - название типа теста
* В случае ошибки: {Code: 3, Error: GET_TOPIC_LIST_ERROR, AdditionalInfo: ...}

### Метод (GET): 'api/getDiffList'
* Возвращает: [{Key, TName, Sh_Name}...]
    * Key - ключ в бд
    * TName - название сложности
    * SName - краткое имя
* В случае ошибки: {Code: 5, Error: GET_DIFF_LIST_ERROR, AdditionalInfo: ...}

### Метод (GET): 'api/getTest/:id'
* Возвращает: [{TestKey, Header, Answer:[...]}...]
    * TestKey - ключ в бд
    * Header - сам вопрос
    * Answer - массив ответов:
    [{Key, Text, Img_Key, IsCorrect, Question_Key}...]
    * Key - ключ в бд
    * Text - текст ответа
    * Img_Key - ссылка на фетч статика картинки
    * IsCorrect - 1/0 правильный или нет
    * Question_Key - ключ вопроса, к которому привязан этот ответ
* В случае ошибки: {Code: 7, Error: GET_TEST_BY_KEY_ERROR, AdditionalInfo: ...}

### Метод (GET): 'api/getRuleList'
* Возвращает: [{Key, Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result}...]
    * Key - ключ в бд
    * Discipline_Level - уровень дисциплины
    * Self_Development - уровень саморазвития
    * Responsibility - уровень развития
    * Perseverance - уровень настойчивости
    * Attentiveness - уровень внимательности
    * Stress - как стрессует пацанчик
    * Result - результат
* В случае ошибки: {Code: 1, Error: GET_RULE_LIST_ERROR, AdditionalInfo: ...}

## POST

### Метод (POST): 'api/submitQuestion'
* Принимает: {TestKey, TestImg, questionName, varArr:[{varName, correct, img}...]}
    * TestKey - ключ в бд теста, к которому вяжем вопрос
    * TestImg - Картинка
    * questionName - текст вопроса
    * varArr - массив ответов
    * varName - текст ответа
    * correct - 0/1 правильный
    * img - картинка
* В случае ошибки: {Code: 4, Error: SUBMIT_QUESTION_ERROR, AdditionalInfo: ...}

### Метод (POST): 'api/submitTest'
* Принимает: {difficulty, name}
    * difficulty - ключ сложности (из бд)
    * name - текст теста
* В случае ошибки: {Code: 6, Error: SUBMIT_TEST_ERROR, AdditionalInfo: ...}

### Метод (POST): 'api/postRule'
* Принимает: {
        disciplineLevel
        selfDevelopment
        responsibility
        perseverance
        attentiveness
        stress
        result
      }
      * Читаем Метод (GET): 'api/getRuleList' для обоснования переменных
* В случае ошибки: {Code: 0, Error: POST_RULE_ERROR, AdditionalInfo: ...}

## PATCH

### Метод (PATCH): 'api/updateRule/:id'
* Принимает: {Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result}
    * Discipline_Level - уровень дисциплины
    * Self_Development - уровень саморазвития
    * Responsibility - уровень развития
    * Perseverance - уровень настойчивости
    * Attentiveness - уровень внимательности
    * Stress - как стрессует пацанчик
    * Result - результат
* В случае ошибки: {Code: 2, Error: UPDATE_RULE_ERROR, AdditionalInfo: ...}