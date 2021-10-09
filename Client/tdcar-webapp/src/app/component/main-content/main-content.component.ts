import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CarHttpService} from "../../service/car.service";
import {Car} from "../../model/app.model";
import { MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";




@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  dataSource=new MatTableDataSource(Array<Car>())
  displayedColumns: string[] = ['id','model','yearManufactured','color','engineTransmission','plateNO','action']

  constructor( private carService: CarHttpService, public addCarDialog: MatDialog, public editCarDialog: MatDialog) {
      carService.getAllCar().subscribe(
        res => this.dataSource.data = _.sortBy(res,'id')
      )

  }

  ngOnInit(): void {

  }

  editCarDetail( car: Car ) {
    const editCarDialogRef = this.editCarDialog.open(
        EditCarDialogWindow, {
          width:"400px",
          data: { carData:car,  plateNumbers: this.dataSource.data.map(c => c.plateNO).filter(num => num!==car.plateNO)
          }
       }
    )

    editCarDialogRef.afterClosed().subscribe(
       res => {
          console.log("Edit CarDialog Close");
         this.carService.getAllCar().subscribe(
           res => this.dataSource.data = _.sortBy(res,'id')
         )
       }
    )
  }

  addCar(){
    const addCarDialogRef = this.addCarDialog.open (
       AddCarDialogWindow, {
         width:"400px",
         data: { carData: this.dataSource.data? this.dataSource.data[this.dataSource.data.length-1] : new Car(),
                 plateNumbers: this.dataSource.data.map(c => c.plateNO)
            }
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
  inputCarModel:FormControl;
  inputCarColor:FormControl;
  inputCarTransmission:string;
  inputCarPlateNumber:FormControl;
  inputYearControl:FormControl;
  car: Car;
  allPlateNumbers: string[];
  constructor(
    public dialogRef: MatDialogRef<AddCarDialogWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarHttpService
  ) {
    this.car = data.carData;
    this.allPlateNumbers = data.plateNumbers;
    this.inputCarModel = new FormControl( "",[Validators.required, Validators.maxLength(15)]);
    this.inputCarColor = new FormControl("", [Validators.required, Validators.maxLength(10)]);
    this.inputCarPlateNumber = new FormControl("", [Validators.required, Validators.maxLength(10), this.duplicatePlateNOCheckValidator()]);
    this.inputYearControl = new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  }

  saveCar(): void {
    const carModel = new Car();
    carModel.model=this.inputCarModel.value;
    carModel.yearManufactured=this.inputYearControl.value;
    carModel.color=this.inputCarColor.value;
    carModel.engineTransmission=this.inputCarTransmission;
    carModel.plateNO=this.inputCarPlateNumber.value;
    this.carService.saveCar(carModel).subscribe(res => {
      if(res){
        console.log("Car Creates Successfully");
        this.dialogRef.close();
      }
    });
  }

  validateSaveButton(): boolean {
    if(this.inputYearControl.value && this.inputCarModel.value && this.inputCarColor.value && this.inputCarTransmission && this.inputCarPlateNumber.value){
      if(this.validateContentChange()){
        return false;
      }else{
        return true;
      }
    }
    return true;
  }

  duplicatePlateNOCheckValidator = ():ValidatorFn => {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if(!value) {return null;}
      if(!this.inputCarPlateNumber){return null;}
      const duplicateCheck = this.allPlateNumbers.includes(this.inputCarPlateNumber.value);
      return duplicateCheck? {Duplicate:true}: null;
    }
  }

  validateContentChange(): boolean{
    if(( this.inputCarColor.value===this.car.color &&
      this.inputCarModel.value===this.car.model &&
      this.inputCarTransmission===this.car.engineTransmission &&
      this.inputYearControl.value===this.car.yearManufactured &&
      this.inputCarPlateNumber.value===this.car.plateNO) ||
      this.inputCarModel.value.length>15 ||
      this.inputCarColor.value.length>10 ||
      this.inputYearControl.value.toString().length!==4 ||
      this.inputCarPlateNumber.value.length > 10 ||
      this.allPlateNumbers.includes(this.inputCarPlateNumber.value)
    ) {
      return false;
    }else{
      return true;
    }
  }

  getErrorMessageInputModel(): string {
    if(this.inputCarModel.hasError('required')){
      return "It must have a value";
    }

    if(this.inputCarModel.value.length>15){
      return "The value is in Max 15 chars"
    }else{
      return "";
    }
  }

  getErrorMessageInputYear(): string {
    if(this.inputYearControl.hasError('required')) {
      return "It must have a value";
    }

    if(this.inputYearControl.value.length!==4){
      return 'It must be a valid number in 4 digits';
    }else{
      return "";
    }
  }

  getErrorMessageInputColor(): string {
    if(this.inputCarColor.hasError('required')){
      return "It must have a value";
    }

    if(this.inputCarColor.value.length>10){
      return "The value is in Max 10 chars";
    }else{
      return "";
    }

  }

  getErrorMessageInputPlateNO(): string {
    if(this.inputCarPlateNumber.hasError('required')){
      return "It must have a value";
    }

    if(this.allPlateNumbers.includes(this.inputCarPlateNumber.value)){
      return "Duplicate Plate Number";
    }

    if(this.inputCarPlateNumber.value.length>10){
      return "The value is in Max 10 chars";
    }else{
      return "";
    }


  }


}

@Component({
  selector: 'EditCarDialogWindow-dialog',
  templateUrl: 'editCarDialogWindow-dialog.html',
})
export class EditCarDialogWindow{

  inputCarModel:FormControl;
  inputCarColor:FormControl;
  inputCarTransmission:string;
  inputCarPlateNumber:FormControl;
  inputYearControl:FormControl;
  allPlateNumbers:string[];
  car: Car;
  constructor(
    public dialogRef: MatDialogRef<AddCarDialogWindow>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarHttpService
  ) {
    this.car=data.carData;
    this.allPlateNumbers=data.plateNumbers;
    this.inputCarModel = new FormControl(this.car.model, [Validators.required, Validators.maxLength(15)]);
    this.inputCarColor = new FormControl(this.car.color, [Validators.required, Validators.maxLength(10)]);
    this.inputCarTransmission = this.car.engineTransmission;
    this.inputCarPlateNumber = new FormControl(this.car.plateNO, [Validators.required, Validators.maxLength(10), this.duplicatePlateNOCheckValidator()]);
    this.inputYearControl = new FormControl(this.car.yearManufactured, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  }

  updateCar(): void {
    const carModel = new Car();
    carModel.id=this.car.id;
    carModel.model=this.inputCarModel.value;;
    carModel.yearManufactured=this.inputYearControl.value;
    carModel.color=this.inputCarColor.value;
    carModel.engineTransmission=this.inputCarTransmission;
    carModel.plateNO=this.inputCarPlateNumber.value;
    this.carService.saveCar(carModel).subscribe(res => {
      if(res){
        console.log("Car Updates Successfully");
        this.dialogRef.close();
      }
    });
  }

  validateUpdateButton(): boolean {
    if(this.inputYearControl.value && this.inputCarModel.value && this.inputCarColor.value && this.inputCarTransmission && this.inputCarPlateNumber.value){
       if(this.validateContentChange()){
         return false;
       }else{
         return true;
       }
    }
    return true;
  }

  validateContentChange(): boolean{
    if((this.inputCarColor.value===this.car.color &&
       this.inputCarModel.value===this.car.model &&
       this.inputCarTransmission===this.car.engineTransmission &&
       this.inputYearControl.value===this.car.yearManufactured &&
       this.inputCarPlateNumber.value===this.car.plateNO) ||
       this.inputCarModel.value.length>15 ||
       this.inputCarColor.value.length>10 ||
       this.inputYearControl.value.toString().length!==4 ||
       this.inputCarPlateNumber.value.length > 10 ||
       this.allPlateNumbers.includes(this.inputCarPlateNumber.value)
    ) {
        return false;
    }else{
        return true;
    }
  }

  duplicatePlateNOCheckValidator = ():ValidatorFn => {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if(!value) {return null;}
      if(!this.inputCarPlateNumber){return null;}
      const duplicateCheck = this.allPlateNumbers.includes(this.inputCarPlateNumber.value);
      return duplicateCheck? {Duplicate:true}: null;
    }
  }

  getErrorMessageInputModel(): string {
    if(this.inputCarModel.hasError('required')){
        return "It must have a value";
    }

    if(this.inputCarModel.value.length>15){
        return "The value is in Max 15 chars"
    }else{
        return "";
    }
  }

  getErrorMessageInputYear(): string {
    if(this.inputYearControl.hasError('required')) {
          return "It must have a value";
    }

    if(this.inputYearControl.value.length!==4){
          return 'It must be a valid number in 4 digits';
    }else{
          return "";
    }
  }

  getErrorMessageInputColor(): string {
    if(this.inputCarColor.hasError('required')){
          return "It must have a value";
    }

    if(this.inputCarColor.value.length>10){
          return "The value is in Max 10 chars";
    }else{
          return "";
    }

  }

  getErrorMessageInputPlateNO(): string {
    if(this.inputCarPlateNumber.hasError('required')){
          return "It must have a value";
    }

    if(this.allPlateNumbers.includes(this.inputCarPlateNumber.value)){
      return "Duplicate Plate Number";
    }

    if(this.inputCarPlateNumber.value.length>10){
          return "The value is in Max 10 chars";
    }else{
          return "";
    }


  }
}


