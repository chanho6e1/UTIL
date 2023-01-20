package com.youtil.server.server.common.exception;

import com.youtil.server.common.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnAuthorizedException extends RuntimeException {
    private com.youtil.server.common.exception.ErrorResponse errorResponse;

    public UnAuthorizedException() {
        super();
        setErrResponse("로그인 해주세요.");
    }

    public UnAuthorizedException(String message) {
        super();
        setErrResponse(message);
    }

    public com.youtil.server.common.exception.ErrorResponse getErrResponse() {
        return errorResponse;
    }

    private void setErrResponse(String message) {
        errorResponse = new ErrorResponse(Boolean.FALSE, message, null);
    }
}