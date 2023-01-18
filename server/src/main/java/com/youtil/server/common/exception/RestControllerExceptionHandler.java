package com.youtil.server.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class RestControllerExceptionHandler {

    // 로그인이 필요한 서비스에서 로그인 되어있지 않은 경우 예외 처리
    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<ErrorResponse> resolveException(UnAuthorizedException exception) {
        ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.UNAUTHORIZED);
    }

    // 데이터 조작 시 해당 데이터를 조작할 권한이 없는 경우
    @ExceptionHandler(ResourceForbiddenException.class)
    public ResponseEntity<ErrorResponse> resolveException(ResourceForbiddenException exception) {
        ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.FORBIDDEN);
    }

    // 데이터가 존재하지 않는 경우 예외 처리
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> resolveException(ResourceNotFoundException exception) {
        ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.NOT_FOUND);
    }

    // 데이터 추가 시도 중 이미 존재하는 resource 일 경우 예외 처리
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> resolveException(ResourceAlreadyExistsException exception) {
        ErrorResponse errResponse = exception.getErrResponse();
        return new ResponseEntity<>(errResponse, HttpStatus.CONFLICT);
    }

    // type mismatch exception
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> resolveException(MethodArgumentTypeMismatchException exception) {
        ErrorResponse errResponse =  new ErrorResponse(false, "잘못된 요청", null);
        return new ResponseEntity<>(errResponse, HttpStatus.BAD_REQUEST);
    }
}