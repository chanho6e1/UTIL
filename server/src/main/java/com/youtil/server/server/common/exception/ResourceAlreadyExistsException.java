package com.youtil.server.server.common.exception;

import com.youtil.server.common.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends RuntimeException {
    private com.youtil.server.common.exception.ErrorResponse errorResponse;

    public ResourceAlreadyExistsException(String message) {
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