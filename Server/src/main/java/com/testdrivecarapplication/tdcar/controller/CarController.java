package com.testdrivecarapplication.tdcar.controller;


import com.testdrivecarapplication.tdcar.model.Car;
import com.testdrivecarapplication.tdcar.service.CarService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/car")
public class CarController {

    Logger logger;

    @Autowired
    CarService carService;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="/getCarList", method = RequestMethod.GET)
    public List<Car> getCarList () {
        List<Car> carList = carService.getAllCar();
        return carList;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="/saveCar", method = RequestMethod.POST)
    public boolean saveCar(@RequestBody Car car) {
        carService.saveCar(car);
        return true;
    }

}
