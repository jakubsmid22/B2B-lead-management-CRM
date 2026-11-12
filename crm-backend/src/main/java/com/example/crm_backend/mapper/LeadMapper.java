package com.example.crm_backend.mapper;

import com.example.crm_backend.dto.request.LeadRequest;
import com.example.crm_backend.dto.request.LeadResponse;
import com.example.crm_backend.entity.Lead;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LeadMapper {

    LeadResponse toResponse(Lead lead);

    Lead toEntity(LeadRequest request);

}
