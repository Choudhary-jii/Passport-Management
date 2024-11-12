package com.javaproject.passport.service;

import com.javaproject.passport.entity.People;
import com.javaproject.passport.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class PassportService
{

    public final PersonRepository repository;

    @Autowired
    public PassportService(PersonRepository repository) {
        this.repository = repository;
    }


    public People saveDetail(People people){
        return  repository.save(people);
    }

    public List<People> getAllPerson(List<People> peoples){
        return  repository.saveAll(peoples);
    }

    public List<People> getPeoples(){

        return  repository.findAll();
    }

    public People getPeopleById(long id){
        return  repository.findById(id).orElse(null);
    }

    public List<People> getPeopleByName(String name) {
        return repository.findByName(name);
    }

    public String deletePeople(Long id){
         repository.deleteById(id);
        return "Person is removed successfully" + id;
    }


    public People updatePeople(People people) {
        People existingPerson = repository.findById(people.getId()).orElse(null);
        if (existingPerson != null) {
            existingPerson.setName(people.getName());
            existingPerson.setMobileNumber(people.getMobileNumber());
            existingPerson.setPspExpMonth(people.getPspExpMonth());
            existingPerson.setPspExpYear(people.getPspExpYear());
            existingPerson.setPspIssueMonth(people.getPspIssueMonth());
            existingPerson.setPspIssueYear(people.getPspIssueYear());
            existingPerson.setDataCreationDate(people.getDataCreationDate());
            return repository.save(existingPerson);
        }
        else {
            throw new PersonNotFoundException("Person with id " + people.getId() + " doesn;t exists.");
        }
    }


    public Page<People> getAllPeopleByPagination(int pageNumber, int pageSize){

       return repository.findAll(PageRequest.of(pageNumber, pageSize));

    }


    public List<People> isValid(int month, int year){

        List<People> people = repository.findByMonthYear(month, year);
        return people;
    }

}
