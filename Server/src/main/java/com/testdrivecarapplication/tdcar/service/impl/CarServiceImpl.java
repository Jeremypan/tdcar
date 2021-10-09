package com.testdrivecarapplication.tdcar.service.impl;


import com.testdrivecarapplication.tdcar.model.Car;
import com.testdrivecarapplication.tdcar.repositry.CarRepository;
import com.testdrivecarapplication.tdcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public List<Car> getAllCar() {
        return carRepository.findAll();
    }

    @Override
    public void saveCar(Car car) {
        carRepository.saveAndFlush(car);
    }

    @Override
    public List<Car> findCarByPlateNumber(String plateNumber) {
        return carRepository.findByPlateNO(plateNumber);
    }


}
