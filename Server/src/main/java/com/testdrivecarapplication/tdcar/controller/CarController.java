package com.testdrivecarapplication.tdcar.controller;


import com.testdrivecarapplication.tdcar.model.Car;
import com.testdrivecarapplication.tdcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/car")
public class CarController {

    @Autowired
    CarService carService;
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="/getCarList", method = RequestMethod.GET)
    public List<Car> getCarList () {
        List<Car> carList = carService.getAllCar();
        return carList;
    }
}
