package com.example.crm_backend.exception;

public class LeadNotFoundException extends RuntimeException {
    public LeadNotFoundException(Long id) {
        super("Klient s id " + id + " neexistuje!");
    }
}
