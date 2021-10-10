package com.testdrivecarapplication.tdcar.controller;


import com.testdrivecarapplication.tdcar.exception.DuplicatePlateNumberException;
import com.testdrivecarapplication.tdcar.model.Car;
import com.testdrivecarapplication.tdcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



/*
*
* RESTful APIs for car
*
* */

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

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value="/saveCar", method = RequestMethod.POST)
    public boolean saveCar(@RequestBody Car car) throws DuplicatePlateNumberException {
        List<Car> carList = carService.findCarByPlateNumber(car.getPlateNO());
        if(carList.size()>0 && carList.get(0).getId()!=car.getId()){
            throw new DuplicatePlateNumberException("Car Plate Number "+car.getPlateNO()+" is not unique.");
        }
        carService.saveCar(car);
        return true;
    }
}
