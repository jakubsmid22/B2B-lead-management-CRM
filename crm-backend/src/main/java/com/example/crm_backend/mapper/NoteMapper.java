package com.example.crm_backend.mapper;

import com.example.crm_backend.dto.request.NoteRequest;
import com.example.crm_backend.dto.response.NoteResponse;
import com.example.crm_backend.entity.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    @Mapping(source = "lead.id", target = "leadId")
    NoteResponse toResponse(Note note);

    Note toEntity(NoteRequest request);

}
