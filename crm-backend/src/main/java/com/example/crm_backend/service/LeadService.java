package com.example.crm_backend.service;

import com.example.crm_backend.dto.request.LeadRequest;
import com.example.crm_backend.dto.request.LeadResponse;
import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.entity.enums.BusinessStatus;
import com.example.crm_backend.mapper.LeadMapper;
import com.example.crm_backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final LeadMapper leadMapper;

    public List<LeadResponse> getAll() {
        return leadRepository.findAll().stream().map(leadMapper::toResponse).toList();
    }

    public LeadResponse createLead(LeadRequest request) {

        Lead lead = leadMapper.toEntity(request);

        lead.setStatus(BusinessStatus.NEW);
        lead.setCreatedAt(LocalDateTime.now());

        Lead savedLead = leadRepository.save(lead);

        return leadMapper.toResponse(savedLead);
    }

}
