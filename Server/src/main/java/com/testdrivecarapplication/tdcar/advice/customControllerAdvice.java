package com.testdrivecarapplication.tdcar.advice;

import com.testdrivecarapplication.tdcar.exception.DuplicatePlateNumberException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/*
*
* To define new error httpError response
* */

@ControllerAdvice
public class customControllerAdvice {

    // DuplicatePlateNumber HttpError Response
    @ExceptionHandler(DuplicatePlateNumberException.class)
    public ResponseEntity<String> handleDuplicatePlateNumberInput(DuplicatePlateNumberException duplicatePlateNumberException){
        return new ResponseEntity<String>(duplicatePlateNumberException.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
