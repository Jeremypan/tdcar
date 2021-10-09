package com.testdrivecarapplication.tdcar.repositry;


import com.testdrivecarapplication.tdcar.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CarRepository extends JpaRepository<Car,Long> {

    List<Car> findAll();

}
