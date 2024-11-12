package com.javaproject.passport.service;

public class PersonNotFoundException extends RuntimeException {
    public PersonNotFoundException(String message) {
        super (message);
    }
}
