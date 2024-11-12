//package com.javaproject.passport.dto;
//
//import javax.validation.constraints;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.NonNull;
//
//@Data
//@AllArgsConstructor (staticName = "build")
//@NoArgsConstructor
//public class peoplevalidation {
//
//    public Long id;
//    @NonNull(message = "")
//    private String name;
//    private long mobileNumber;
//    private int pspExpMonth;
//    private int pspExpYear;
//    private int pspIssueMonth;
//    private int pspIssueYear;
//
//}

package com.javaproject.passport.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class peoplevalidation {

    public Long id;

    @NotNull(message = "Name can't be null !")
    @NotBlank(message = "email is mandatory")
    private String name;

    @NotNull(message = "Mobile Number is required !")
    private long mobileNumber;
    private int pspExpMonth;
    private int pspExpYear;
    private int pspIssueMonth;
    private int pspIssueYear;

    public peoplevalidation(LocalDate dataCreationDate) {
        this.dataCreationDate = LocalDate.now();
    }

    private LocalDate dataCreationDate;

}
