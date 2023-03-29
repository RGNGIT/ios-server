export default {
  /// ФаззиЛогик
  GET_FUZZY_RESULT: "/fuzzyResult",
  /// Тестики
  GET_TOPIC_LIST: "/getTopicList", // GET // *
  SUBMIT_QUESTION: "/submitQuestion", // POST // *
  GET_DIFF_LIST: "/getDiffList", // GET // *
  SUBMIT_TEST: "/submitTest", // POST // *
  GET_TEST_BY_KEY: "/getTest/:id", // GET // *
  ANSWER_VALIDATE: "/validateAnswer",
  GET_TEST_LIST: "/getTestList",
  DELETE_ANSWERS: "/deleteAnswers",
  /// Правила
  GET_RULE_BY_KEY: "/getRule/:id",
  POST_RULE: "/postRule", // POST *
  GET_RULE_LIST: "/getRuleList", // GET // *
  UPDATE_RULE: "/updateRule/:id", // PATCH // *
  /// Физлицо
  POST_NEW_PHYS_USER: "/newPhys", // POST //
  USER_LOGIN: "/login", // POST //
  GET_USER_INFO: "/userInfo/:id", // GET //
  UPDATE_USER_INFO: "/updateUserInfo", // PATCH
  REFRESH_SESSION: "/refreshSession" // POST
};
