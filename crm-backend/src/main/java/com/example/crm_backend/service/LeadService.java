package com.example.crm_backend.service;

import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;

    public List<Lead> getAll() {
        return leadRepository.findAll();
    }

}
