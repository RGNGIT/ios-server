enum ErrCode {
    POST_RULE_ERROR = 0,
    GET_RULE_LIST_ERROR = 1,
    UPDATE_RULE_ERROR = 2,
    GET_TOPIC_LIST_ERROR = 3,
    SUBMIT_QUESTION_ERROR = 4,
    GET_DIFF_LIST_ERROR = 5,
    SUBMIT_TEST_ERROR = 6,
    GET_TEST_BY_KEY_ERROR = 7
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