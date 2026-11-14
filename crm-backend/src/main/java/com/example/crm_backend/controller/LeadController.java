package com.example.crm_backend.controller;

import com.example.crm_backend.dto.request.LeadRequest;
import com.example.crm_backend.dto.request.NoteRequest;
import com.example.crm_backend.dto.response.LeadResponse;
import com.example.crm_backend.dto.request.LeadStatusUpdateRequest;
import com.example.crm_backend.dto.response.NoteResponse;
import com.example.crm_backend.entity.enums.BusinessStatus;
import com.example.crm_backend.service.LeadService;
import com.example.crm_backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    private final NoteService noteService;

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.get(id));
    }

    @GetMapping
    public ResponseEntity<Page<LeadResponse>> getAll(@RequestParam(required = false) BusinessStatus status, @RequestParam(required = false) String name, Pageable pageable) {
        return ResponseEntity.ok(leadService.getAll(pageable, status, name));
    }

    @GetMapping("/{leadId}/notes")
    public ResponseEntity<List<NoteResponse>> getAllNotesFromLead(@PathVariable Long leadId) {
        return ResponseEntity.ok(noteService.getAllByLeadId(leadId));
    }

    @PostMapping
    public ResponseEntity<LeadResponse> create(@RequestBody @Valid LeadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.createLead(request));
    }

    @PostMapping("/{leadId}/notes")
    public ResponseEntity<NoteResponse> addNote(@RequestBody @Valid NoteRequest request, @PathVariable Long leadId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.add(request, leadId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadResponse> updateStatus(@PathVariable Long id, @RequestBody @Valid LeadStatusUpdateRequest request) {
        return ResponseEntity.ok(leadService.updateStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        leadService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

     @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long noteId) {
        noteService.delete(noteId);
         return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
     }

}
