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
    private Long Id;
    @Basic
    @Column(name="Model")
    private String Model;
    @Basic
    @Column(name="YEARMANUFACTURED")
    private Integer YearManufactured;
    @Basic
    @Column(name="Color")
    private String Color;
    @Basic
    @Column(name="ENGINETRANSMISSION")
    private String EngineTransmission;
    @Basic
    @Column(name="Plate_No")
    private String PlateNO;

    public Car() {
    }

    public Car(Long id, String model, Integer yearManufactured, String color, String engineTransmission, String plateNO) {
        Id = id;
        Model = model;
        YearManufactured = yearManufactured;
        Color = color;
        EngineTransmission = engineTransmission;
        PlateNO = plateNO;
    }

    public Car(String model, Integer yearManufactured, String color, String engineTransmission, String plateNO) {
        Model = model;
        YearManufactured = yearManufactured;
        Color = color;
        EngineTransmission = engineTransmission;
        PlateNO = plateNO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(Id, car.Id) && Objects.equals(Model, car.Model) && Objects.equals(YearManufactured, car.YearManufactured) && Objects.equals(Color, car.Color) && Objects.equals(EngineTransmission, car.EngineTransmission) && Objects.equals(PlateNO, car.PlateNO);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, Model, YearManufactured, Color, EngineTransmission, PlateNO);
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getModel() {
        return Model;
    }

    public void setModel(String model) {
        Model = model;
    }

    public Integer getYearManufactured() {
        return YearManufactured;
    }

    public void setYearManufactured(Integer yearManufactured) {
        YearManufactured = yearManufactured;
    }

    public String getColor() {
        return Color;
    }

    public void setColor(String color) {
        Color = color;
    }

    public String getEngineTransmission() {
        return EngineTransmission;
    }

    public void setEngineTransmission(String engineTransmission) {
        EngineTransmission = engineTransmission;
    }

    public String getPlateNO() {
        return PlateNO;
    }

    public void setPlateNO(String plateNO) {
        PlateNO = plateNO;
    }
}
