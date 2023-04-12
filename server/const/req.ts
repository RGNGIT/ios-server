export default {
  /// ФаззиЛогик
  GET_FUZZY_RESULT: "/fuzzyResult",
  GET_FUZZY_STATUS: "/getFuzzyStatus",
  GET_STORED_STATUS: "/getStoredStatus",
  /// Тестики
  GET_TOPIC_LIST: "/getTopicList", // GET // *
  SUBMIT_QUESTION: "/submitQuestion", // POST // *
  GET_DIFF_LIST: "/getDiffList", // GET // *
  SUBMIT_TEST: "/submitTest", // POST // *
  GET_TEST_BY_KEY: "/getTest/:id", // GET // *
  ANSWER_VALIDATE: "/validateAnswer",
  GET_TEST_LIST: "/getTestList",
  DELETE_ANSWERS: "/deleteAnswers",
  TEST_EDIT: "/editTest/:id",
  DELETE_TEST: "/deleteTest/:id",
  DELETE_QUESTION: "/deleteQuestion/:id",
  SUBMIT_RESULT: "/submitResult",
  GET_TEST_RESULTS: "/getTestResults/:id",
  GET_COMPLETE_DISCIPLINES: "/getCompleteDisciplines/:id",
  /// Правила
  GET_TERM_LEVELS: "/getTermLevels/:name",
  GET_TERM_DOTS: "/getTermDots",
  GET_RULE_BY_KEY: "/getRule/:id",
  POST_RULE: "/postRule", // POST *
  GET_RULE_LIST: "/getRuleList", // GET // *
  UPDATE_RULE: "/updateRule/:id", // PATCH // *
  /// Физлицо
  POST_NEW_PHYS_USER: "/newPhys", // POST //
  USER_LOGIN: "/login", // POST //
  GET_USER_INFO: "/userInfo/:id", // GET //
  UPDATE_USER_INFO: "/updateUserInfo", // PATCH
  REFRESH_SESSION: "/refreshSession", // POST
  GET_ALL_USERS: "/getAllUsers",
  /// Дисциплины
  POST_NEW_DISCIPLINE: "/postDiscipline",
  GET_DISCIPLINES: "/getDisciplines",
  POST_NEW_TOPIC: "/postTopic",
  GET_TOPICS: "/getTopics",
  POST_TOPIC_MATERIAL: "/postTopicMaterial",
  CONNECT_DISCIPLINE_USER: "/connectUserDiscipline",
  GET_MY_DISCIPLINES: "/getMyDisciplines",
  GET_DIFFICULTY_LIST: "/getSlojnaList"
};
