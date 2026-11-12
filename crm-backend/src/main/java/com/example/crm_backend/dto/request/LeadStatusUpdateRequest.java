package com.example.crm_backend.dto.request;

import com.example.crm_backend.entity.enums.BusinessStatus;
import jakarta.validation.constraints.NotNull;

public record LeadStatusUpdateRequest(@NotNull BusinessStatus status) {
}
