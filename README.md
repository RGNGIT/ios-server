# Эндпоинты

* Каждый эндпоинт возвращает объект с парой {Status, Data}.
    * Status ('OK', 'ERROR') - нужен для того, чтобы фронт знал, когда действие на стороне бэка завершено (особенно актуально для запросов типа POST, PATCH, DELETE)
    * Data - данные для парсинга, соответствующие запросу или объект с кодом ошибки

## Middlewares

### ApiCheck (Проверяет валидность аутентификации юзера. Не активен при DEV_MODE=true)
* Для каждого запроса (кроме скипнутых*) нужны определенные хедеры для аутентификации юзера:
    * userkey - ключ юзера в бд из возвращенного объекта при логине/регистрации
    * verify - стринг Verify из возвращенного объекта при логине/регистрации
    * token - стринг Token из возвращенного объекта при логине/регистрации
* *URL, пропускаемые данным мидлвейром (хедеры не нужны):
    * 'api/login' (POST::USER_LOGIN)
    * 'api/newPhys' (POST::POST_NEW_PHYS_USER)
* В случае ошибки: {Code: 11, Error: AUTH_TOKEN_ERROR, AdditionalInfo: "Wrong auth token. DEV_MODE is ${process.env.DEV_MODE}"}

## GET

### Метод (GET::): '/status'
* Мониторинг ресурсов сервера и статусов Express (Socket.IO)

### Метод (GET::GET_TOPIC_LIST): 'api/getTopicList'
* Возвращает: [{Key, Name, TName}...] 
    * Key - ключ теста в бд
    * Name - название теста
    * TName - название типа теста
* В случае ошибки: {Code: 3, Error: GET_TOPIC_LIST_ERROR, AdditionalInfo: ...}

### Метод (GET::GET_DIFF_LIST): 'api/getDiffList'
* Возвращает: [{Key, TName, Sh_Name}...]
    * Key - ключ в бд
    * TName - название сложности
    * SName - краткое имя
* В случае ошибки: {Code: 5, Error: GET_DIFF_LIST_ERROR, AdditionalInfo: ...}

### Метод (GET::GET_TEST_BY_KEY): 'api/getTest/:id'
* Возвращает: [{TestKey, Header, Answer:[...]}...]
    * TestKey - ключ в бд
    * Header - сам вопрос
    * Answer - массив ответов:
    [{Key, Text, Img_Key, Question_Key}...]
    * Key - ключ в бд
    * Text - текст ответа
    * Img_Key - ссылка на фетч статика картинки
    * Question_Key - ключ вопроса, к которому привязан этот ответ
* В случае ошибки: {Code: 7, Error: GET_TEST_BY_KEY_ERROR, AdditionalInfo: ...}

### Метод (GET::ANSWER_VALIDATE): 'api/validateAnswer?questionKey=123&answerKey=321'
* Возвращает: {Correct}
    * Correct - правильный ответ или не правильный (true/false)
* Принимает:
    * questionKey - ключ вопроса
    * answerKey - ключ ответа, который выбрал юзер
* В случае ошибки: {Code: 15, Error: ANSWER_VALIDATE_ERROR, AdditionalInfo: ...}

### Метод (GET::GET_FUZZY_RESULT): 'api/fuzzyResult?t1=11&t2=22&t3=33...'
* Возвращает: {Result, Result_Term, ResultFunc:{...}}
    * Result - результат в числе
    * Result_Term - результат в буквах
    * ResultFunc - точки графиков, но пока забить
* Принимает:
    * t1...t6 - числа от 0 до 100 порядке: Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress
* В случае ошибки: {Code: 14, Error: GET_FUZZY_RESULT_ERROR, AdditionalInfo: ...}

### Метод (GET::GET_RULE_LIST): 'api/getRuleList'
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

### Метод (GET::GET_USER_INFO): 'api/userInfo/:id'
* Возвращает: {reg: {...}, phys: {...}}
    * reg - реистрационные данные:
    {
        Reg_Date
        Phys_Key
        Login
        Password
    }
    * Reg_Date - дата регистрации
    * Phys_Key - ключ физлица
    * Login - логин
    * Password - пароль (зашифрованный)
    * phys - данные физлица:
    {
        Key
        Name
        Surname
        Patronymic
        Email
        Sex_Key
        Interface_Type
        Rating
    }
    * Key - ключ
    * Surname, Name, Patronymic - ФИО
    * Email - почта
    * Sex_Key - ключ пола
    * Interface_Type - ?
    * Rating - ?
* В случае ошибки: {Code: 12, Error: GET_USER_INFO_ERROR, AdditionalInfo: ...}

## POST

### Метод (POST::SUBMIT_QUESTION): 'api/submitQuestion'
* Принимает: {TestKey, TestImg, questionName, varArr:[{varName, correct, img}...]}
    * TestKey - ключ в бд теста, к которому вяжем вопрос
    * TestImg - Картинка
    * questionName - текст вопроса
    * varArr - массив ответов
    * varName - текст ответа
    * correct - 0/1 правильный
    * img - картинка
* В случае ошибки: {Code: 4, Error: SUBMIT_QUESTION_ERROR, AdditionalInfo: ...}

### Метод (POST::SUBMIT_TEST): 'api/submitTest'
* Принимает: {difficulty, name}
    * difficulty - ключ сложности (из бд)
    * name - текст теста
* В случае ошибки: {Code: 6, Error: SUBMIT_TEST_ERROR, AdditionalInfo: ...}

### Метод (POST::POST_RULE): 'api/postRule'
* Принимает: {
        disciplineLevel,
        selfDevelopment,
        responsibility,
        perseverance,
        attentiveness,
        stress,
        result
      }
      * Читаем Метод (GET): 'api/getRuleList' для обоснования переменных
* В случае ошибки: {Code: 0, Error: POST_RULE_ERROR, AdditionalInfo: ...}

### Метод (POST::POST_NEW_PHYS_USER): 'api/newPhys'
* Принимает: {
        Name,
        Surname,
        Patronymic,
        Email,
        Sex_Key,
        Role_Key,
        Interface_Type,
        Rating,
        Login,
        Password
      }
    * Surname, Name, Patronymic - ФИО
    * Email - почта
    * Sex_Key - ключ пола
    * Role_Key - ключ роли в системе
    * Interface_Type - ?
    * Rating - ?
    * Login - логин
    * Password - пароль
* В случае ошибки: {Code: 8, Error: POST_NEW_PHYS_USER_ERROR, AdditionalInfo: ...}

### Метод (POST::USER_LOGIN): 'api/login'
* Принимает: {
        Email,
        Password
      }
    * Email - почта
    * Password - пароль
* В случае ошибки: 
      * При системной ошибке {Code: 9, Error: USER_LOGIN_ERROR, AdditionalInfo: ...}
      * При неправильных данных {Code: 10, Error: WRONG_LOGIN_DATA_ERROR, AdditionalInfo: "Wrong login/password"}

## PATCH

### Метод (PATCH::UPDATE_RULE): 'api/updateRule/:id'
* Принимает: {Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result}
    * Discipline_Level - уровень дисциплины
    * Self_Development - уровень саморазвития
    * Responsibility - уровень развития
    * Perseverance - уровень настойчивости
    * Attentiveness - уровень внимательности
    * Stress - как стрессует пацанчик
    * Result - результат
* В случае ошибки: {Code: 2, Error: UPDATE_RULE_ERROR, AdditionalInfo: ...}

### Метод (PATCH::UPDATE_USER_INFO): 'api/updateUserInfo'
* Принимает: {Key, Name, Surname, Patronymic, Email, Sex_Key, Interface_Type, Rating, Login, Password}
    * Key - ключ физлица
    * Surname, Name, Patronymic - ФИО
    * Email - почта
    * Sex_Key - ключ пола
    * Interface_Type - ?
    * Rating - ?
    * Login - логин
    * Password - пароль
* В случае ошибки: {Code: 13, Error: UPDATE_USER_INFO_ERROR, AdditionalInfo: ...}
