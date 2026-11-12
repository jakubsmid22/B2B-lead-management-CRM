package com.example.crm_backend.controller;

import com.example.crm_backend.dto.request.LeadRequest;
import com.example.crm_backend.dto.request.LeadResponse;
import com.example.crm_backend.dto.request.LeadStatusUpdateRequest;
import com.example.crm_backend.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<List<LeadResponse>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(leadService.getAll());
    }

    @PostMapping
    public ResponseEntity<LeadResponse> create(@RequestBody @Valid LeadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.createLead(request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadResponse> updateStatus(@PathVariable Long id, @RequestBody @Valid LeadStatusUpdateRequest request) {
        return ResponseEntity.ok(leadService.updateStatus(id, request));
    }

}
