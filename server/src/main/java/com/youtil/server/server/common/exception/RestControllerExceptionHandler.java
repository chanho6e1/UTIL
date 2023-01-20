package com.youtil.server.server.common.exception;

import com.youtil.server.common.exception.ErrorResponse;
import com.youtil.server.common.exception.ResourceAlreadyExistsException;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.common.exception.UnAuthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class RestControllerExceptionHandler {

    // 로그인이 필요한 서비스에서 로그인 되어있지 않은 경우 예외 처리
    @ExceptionHandler(com.youtil.server.common.exception.UnAuthorizedException.class)
    public ResponseEntity<com.youtil.server.common.exception.ErrorResponse> resolveException(UnAuthorizedException exception) {
        com.youtil.server.common.exception.ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.UNAUTHORIZED);
    }

    // 데이터 조작 시 해당 데이터를 조작할 권한이 없는 경우
    @ExceptionHandler(com.youtil.server.common.exception.ResourceForbiddenException.class)
    public ResponseEntity<com.youtil.server.common.exception.ErrorResponse> resolveException(ResourceForbiddenException exception) {
        com.youtil.server.common.exception.ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.FORBIDDEN);
    }

    // 데이터가 존재하지 않는 경우 예외 처리
    @ExceptionHandler(com.youtil.server.common.exception.ResourceNotFoundException.class)
    public ResponseEntity<com.youtil.server.common.exception.ErrorResponse> resolveException(ResourceNotFoundException exception) {
        com.youtil.server.common.exception.ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.NOT_FOUND);
    }

    // 데이터 추가 시도 중 이미 존재하는 resource 일 경우 예외 처리
    @ExceptionHandler(com.youtil.server.common.exception.ResourceAlreadyExistsException.class)
    public ResponseEntity<com.youtil.server.common.exception.ErrorResponse> resolveException(ResourceAlreadyExistsException exception) {
        com.youtil.server.common.exception.ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.CONFLICT);
    }

    // type mismatch exception
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<com.youtil.server.common.exception.ErrorResponse> resolveException(MethodArgumentTypeMismatchException exception) {
        com.youtil.server.common.exception.ErrorResponse errResponse =  new ErrorResponse(false, "잘못된 요청", null);
        return new ResponseEntity<>(errResponse, HttpStatus.BAD_REQUEST);
    }
}