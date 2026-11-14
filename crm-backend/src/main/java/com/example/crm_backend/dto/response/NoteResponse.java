package com.example.crm_backend.dto.response;


import java.time.LocalDateTime;

public record NoteResponse(Long id, String content, Long leadId, LocalDateTime createdAt) {
}
