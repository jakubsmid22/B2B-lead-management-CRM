package com.example.crm_backend.exception;

public class NoteNotFoundException extends RuntimeException {
    public NoteNotFoundException(Long id) {
        super("Poznámka s id " + id + " neexistuje!");
    }
}
