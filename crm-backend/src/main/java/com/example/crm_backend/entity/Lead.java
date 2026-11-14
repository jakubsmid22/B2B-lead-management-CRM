package com.example.crm_backend.entity;

import com.example.crm_backend.entity.enums.BusinessStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private BusinessStatus status;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "lead", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes;
}
