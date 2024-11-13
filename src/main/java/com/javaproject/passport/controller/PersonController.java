package com.javaproject.passport.controller;

import com.javaproject.passport.entity.People;
import com.javaproject.passport.repository.PersonRepository;
import com.javaproject.passport.service.PassportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PersonController{

    private final PassportService service;
    private final PersonRepository personRepository;

    @Autowired
    public PersonController(PassportService service, PersonRepository personRepository) {
        this.service = service;
        this.personRepository = personRepository;
    }

    @PostMapping("/addPerson")
    public People addPerson(@Valid @RequestBody People people) {
        return service.saveDetail(people);
    }

    @GetMapping("/valid")
    public List<People> isValid(@RequestParam("month") int month, @RequestParam("year") int year) {
        return service.isValid(month, year);
    }

    @GetMapping("/pagination/{pageNumber}/{pageSize}")
    public Page<People> getPeoplePagination(@PathVariable int pageNumber, @PathVariable int pageSize) {
        return service.getAllPeopleByPagination(pageNumber - 1, pageSize); // Adjusted path parameters
    }

    @GetMapping("/person/{id}")
    public People findPeopleById(@PathVariable int id) {
        return service.getPeopleById(id);
    }


    @GetMapping("/person/name/{name}")
    public List<People> findPeopleByName(@PathVariable String name) {
        return service.getPeopleByName(name);
    }


    @PutMapping("/update")
    public People updatePeople(@RequestBody People people) {
        return service.updatePeople(people);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePerson(@PathVariable Long id) {
        return service.deletePeople(id);
    }
}
