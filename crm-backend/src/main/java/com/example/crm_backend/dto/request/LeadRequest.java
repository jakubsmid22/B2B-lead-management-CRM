package com.example.crm_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LeadRequest(@NotBlank String name, @Email String email, @NotBlank String phoneNumber) {
}
