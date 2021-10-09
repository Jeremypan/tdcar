package com.testdrivecarapplication.tdcar.model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/*
*  The persistent class for the Cars testdrive Table
* */


@Entity
@Table(name= "cars",schema = "testdrive")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Basic
    @Column(name="Model")
    private String model;
    @Basic
    @Column(name="YEARMANUFACTURED")
    private Integer yearManufactured;
    @Basic
    @Column(name="Color")
    private String color;
    @Basic
    @Column(name="ENGINETRANSMISSION")
    private String engineTransmission;
    @Basic
    @Column(name="Plate_No")
    private String plateNO;

    public Car() {
    }

    public Car(Long id, String model, Integer yearManufactured, String color, String engineTransmission, String plateNO) {
        this.id = id;
        this.model = model;
        this.yearManufactured = yearManufactured;
        this.color = color;
        this.engineTransmission = engineTransmission;
        this.plateNO = plateNO;
    }

    public Car(String model, Integer yearManufactured, String color, String engineTransmission, String plateNO) {
        this.model = model;
        this.yearManufactured = yearManufactured;
        this.color = color;
        this.engineTransmission = engineTransmission;
        this.plateNO = plateNO;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYearManufactured() {
        return yearManufactured;
    }

    public void setYearManufactured(Integer yearManufactured) {
        this.yearManufactured = yearManufactured;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEngineTransmission() {
        return engineTransmission;
    }

    public void setEngineTransmission(String engineTransmission) {
        this.engineTransmission = engineTransmission;
    }

    public String getPlateNO() {
        return plateNO;
    }

    public void setPlateNO(String plateNO) {
        this.plateNO = plateNO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(id, car.id) && Objects.equals(model, car.model) && Objects.equals(yearManufactured, car.yearManufactured) && Objects.equals(color, car.color) && Objects.equals(engineTransmission, car.engineTransmission) && Objects.equals(plateNO, car.plateNO);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, model, yearManufactured, color, engineTransmission, plateNO);
    }
}
