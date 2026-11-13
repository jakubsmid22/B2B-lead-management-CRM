package com.example.crm_backend.repository;

import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.entity.enums.BusinessStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    Page<Lead> findByStatus(BusinessStatus status, Pageable pageable);

    Page<Lead> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Lead> findByStatusAndNameContainingIgnoreCase(BusinessStatus status, String name, Pageable pageable);

}
