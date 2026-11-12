package com.example.crm_backend.config;

import com.example.crm_backend.entity.Lead;
import com.example.crm_backend.entity.enums.BusinessStatus;
import com.example.crm_backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final LeadRepository leadRepository;

    @Override
    public void run(String... args) throws Exception {
        for (int i = 0; i < 50; i++) {
            Lead lead = new Lead();
            lead.setName("Zákazník " + i);
            lead.setEmail("zakaznik" + i + "@gmail.com");
            lead.setPhoneNumber("123 456 7" + String.format("%02d", i));
            lead.setStatus(BusinessStatus.NEW);
            lead.setCreatedAt(LocalDateTime.now());
            leadRepository.save(lead);
        }
    }
}
