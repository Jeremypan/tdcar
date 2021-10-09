package com.testdrivecarapplication.tdcar.repositry;


import com.testdrivecarapplication.tdcar.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,Long> {
    List<Car> findByPlateNO(String plateNo);
    List<Car> findAll();
}
