package com.kyn.api.kynapi.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kyn.api.kynapi.Exceptions.OAuth2AuthenticationProcessingException;

// @RestControllerAdvice
// public class ExceptionHandlerController {
//     @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
//     public ResponseEntity<?> errorMessage(OAuth2AuthenticationProcessingException ex){
//         return new ResponseEntity<>(ex.toString(), HttpStatus.UNAUTHORIZED);
//     }
// }
