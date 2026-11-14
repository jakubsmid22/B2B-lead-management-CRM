package com.example.crm_backend.service;

import com.example.crm_backend.dto.request.NoteRequest;
import com.example.crm_backend.dto.response.NoteResponse;
import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.entity.Note;
import com.example.crm_backend.exception.LeadNotFoundException;
import com.example.crm_backend.mapper.NoteMapper;
import com.example.crm_backend.repository.LeadRepository;
import com.example.crm_backend.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    private final LeadRepository leadRepository;

    private final NoteMapper noteMapper;

    public List<NoteResponse> getAllByLeadId(Long leadId) {
        if (!leadRepository.existsById(leadId)) {
            throw new LeadNotFoundException(leadId);
        }

        return noteRepository
                            .findByLeadIdOrderByCreatedAtDesc(leadId)
                            .stream()
                            .map(noteMapper::toResponse)
                            .toList();

    }

    public NoteResponse add(NoteRequest request, Long leadId) {

        Lead lead = leadRepository.findById(leadId).orElseThrow(() -> new LeadNotFoundException(leadId));

        Note note = noteMapper.toEntity(request);
        note.setLead(lead);
        note.setCreatedAt(LocalDateTime.now());

        return noteMapper.toResponse(noteRepository.save(note));
    }

}
