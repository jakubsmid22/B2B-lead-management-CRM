package com.example.crm_backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record NoteRequest(@NotBlank String content) {
}
