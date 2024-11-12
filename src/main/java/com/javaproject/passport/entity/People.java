package com.javaproject.passport.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "Passport_Detail_List")
public class People
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String name;
    private long mobileNumber;
    private int pspExpMonth;
    private int pspExpYear;
    private int pspIssueMonth;
    private int pspIssueYear;
    private LocalDate dataCreationDate;



}
