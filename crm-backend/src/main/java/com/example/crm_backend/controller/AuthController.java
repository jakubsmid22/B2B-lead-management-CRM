package com.example.crm_backend.controller;

import com.example.crm_backend.dto.request.LoginRequest;
import com.example.crm_backend.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/login")
@RequiredArgsConstructor
public class AuthController {

    private static final String TEST_USERNAME = "admin";
    private static final String TEST_PASSWORD = "password";

    @PostMapping
    ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if (TEST_USERNAME.equals(request.username()) && TEST_PASSWORD.equals(request.password())) {
            String token = "test_token";

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Neplatané přihlašovací údaje!"));
    }

}
