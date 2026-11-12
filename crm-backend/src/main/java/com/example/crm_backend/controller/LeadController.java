package com.example.crm_backend.controller;

import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public List<Lead> getAll() {
        return leadService.getAll();
    }
}
