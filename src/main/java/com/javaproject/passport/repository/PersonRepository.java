package com.javaproject.passport.repository;

import com.javaproject.passport.entity.People;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<People, Long> {



//    People findByName(String name);

    @Query("SELECT p FROM People p WHERE LOWER(p.name) = LOWER(:name)")
    List<People> findByName(@Param("name") String name);



    //void delete(int id);

    void deleteById(long id);

    @Query("SELECT p FROM People p WHERE p.pspExpMonth =:month AND p.pspExpYear =:year")
    public List<People> findByMonthYear(@Param("month") int month, @Param("year") int year);



}
