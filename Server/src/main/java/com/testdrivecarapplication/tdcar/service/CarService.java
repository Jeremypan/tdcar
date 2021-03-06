package com.testdrivecarapplication.tdcar.service;

import com.testdrivecarapplication.tdcar.model.Car;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarService {

    List<Car> getAllCar();

    void saveCar(Car car);

    List<Car> findCarByPlateNumber(String plateNumber);

}
