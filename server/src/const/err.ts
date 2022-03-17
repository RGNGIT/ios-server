enum ErrCode {
    POST_RULE_ERROR = 0,
    GET_RULE_LIST_ERROR = 1,
    UPDATE_RULE_ERROR = 2,
    GET_TOPIC_LIST_ERROR = 3,
    SUBMIT_QUESTION_ERROR = 4,
    GET_DIFF_LIST_ERROR = 5,
    SUBMIT_TEST_ERROR = 6,
    GET_TEST_BY_KEY_ERROR = 7,
    POST_NEW_PHYS_USER_ERROR = 8,
    USER_LOGIN_ERROR = 9,
    WRONG_LOGIN_DATA_ERROR = 10,
    AUTH_TOKEN_ERROR = 11,
    GET_USER_INFO_ERROR = 12,
    UPDATE_USER_INFO_ERROR = 13,
    GET_FUZZY_RESULT_ERROR = 14,
    ANSWER_VALIDATE_ERROR = 15
}

class ErrorHandler {
    async send(method, info): Promise < {
        Code,
        Error,
        AdditionalInfo
    } > {
        let error = `${method}_ERROR`;
        return {Code: ErrCode[error], Error: error, AdditionalInfo: info};
    }
}

export default new ErrorHandler();
