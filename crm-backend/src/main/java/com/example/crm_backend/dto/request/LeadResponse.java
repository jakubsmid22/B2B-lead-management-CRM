package com.example.crm_backend.dto.request;

import com.example.crm_backend.entity.enums.BusinessStatus;

import java.time.LocalDateTime;

public record LeadResponse(Long id, String name, String email, String phoneNumber, BusinessStatus status, LocalDateTime createdAt) {
}
