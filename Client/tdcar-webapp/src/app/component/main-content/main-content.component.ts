import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CarHttpService} from "../../service/car.service";
import {Car} from "../../model/app.model";
import { MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  dataSource=new MatTableDataSource(Array<Car>())
  displayedColumns: string[] = ['id','model','yearManufactured','color','engineTransmission','plateNO','action']

  constructor( private carService: CarHttpService, public addCarDialog: MatDialog) {
      carService.getAllCar().subscribe(
        res => this.dataSource.data = _.sortBy(res,'id')
      )

  }

  ngOnInit(): void {

  }

  editCarDetail( car: Car ){
    this.carService.getAllCar().subscribe(
      res => this.dataSource.data = _.sortBy(res,'id')
    )
  }

  addCar(){
    const addCarDialogRef = this.addCarDialog.open (
       AddCarDialogWindow, {
         width:"400px",
         data: this.dataSource.data? this.dataSource.data[this.dataSource.data.length-1] : new Car()
      }
    )

    addCarDialogRef.afterClosed().subscribe(
       res => {
          console.log("Add CarDialog Close");
          this.carService.getAllCar().subscribe(
           res => this.dataSource.data = _.sortBy(res,'id')
         )
       }
    )
  }
}


@Component({
  selector: 'AddCarDialogWindow-dialog',
  templateUrl: 'addCarDialogWindow-dialog.html',
})
export class AddCarDialogWindow{


  inputCarModel:string;
  inputCarManufacturedYear:number;
  inputCarColor:string;
  inputCarTransmission:string;
  inputCarPlateNumber:string;
  constructor(
    public dialogRef: MatDialogRef<AddCarDialogWindow>,
    @Inject(MAT_DIALOG_DATA) public car: Car,
    private carService: CarHttpService
  ) {


  }

  saveCar(): void {
    const carModel = new Car();
    carModel.model=this.inputCarModel;
    carModel.yearManufactured=this.inputCarManufacturedYear;
    carModel.color=this.inputCarColor;
    carModel.engineTransmission=this.inputCarTransmission;
    carModel.plateNO=this.inputCarPlateNumber;
    this.carService.saveCar(carModel).subscribe(value => console.log(value));;
    // this.dialogRef.close();
  }

  validateSaveButton(): boolean {
    if(this.inputCarManufacturedYear && this.inputCarModel && this.inputCarColor && this.inputCarTransmission && this.inputCarPlateNumber){
        if(this.inputCarManufacturedYear.toString().length===4){
            return false;
        }else{
            return true;
        }
    }
    return true;
  }


}
