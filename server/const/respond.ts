enum ErrCode {
  POST_RULE_ERROR =          0,
  GET_RULE_LIST_ERROR =      1,
  UPDATE_RULE_ERROR =        2,
  GET_TOPIC_LIST_ERROR =     3,
  SUBMIT_QUESTION_ERROR =    4,
  GET_DIFF_LIST_ERROR =      5,
  SUBMIT_TEST_ERROR =        6,
  GET_TEST_BY_KEY_ERROR =    7,
  POST_NEW_PHYS_USER_ERROR = 8,
  USER_LOGIN_ERROR =         9,
  WRONG_LOGIN_DATA_ERROR =   10,
  AUTH_TOKEN_ERROR =         11,
  GET_USER_INFO_ERROR =      12,
  UPDATE_USER_INFO_ERROR =   13,
  GET_FUZZY_RESULT_ERROR =   14,
  ANSWER_VALIDATE_ERROR =    15,
  ROLE_ERROR =               16,
  REFRESH_SESSION_ERROR =    17,
  GET_TEST_LIST_ERROR =      18,
  GET_RULE_BY_ID_ERROR =     19,
  GET_TERM_DOTS_ERROR =      20,
  GET_TERM_LEVELS_ERROR =    21,
  TEST_EDIT =                22,
  DETELE_TEST =              23,
  DELETE_QUESTION =          24
}

class ResultHandler {
  async buildError(
    method: string,
    info: string
  ): Promise<{
    Code;
    Error;
    AdditionalInfo;
  }> {
    let error = `${method}_ERROR`;
    return { Code: ErrCode[error], Error: error, AdditionalInfo: info };
  }
  async result<T>(
    status: string,
    data: T
  ): Promise<{
    Status: string;
    Data: T;
  }> {
    return { Status: status, Data: data };
  }
}

export default new ResultHandler();
