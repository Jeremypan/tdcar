import {Injectable} from "@angular/core";
import {HttpClientService} from "./httpClient.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Car} from "../model/app.model";
import {map} from "rxjs/operators";



@Injectable()
export class CarHttpService {
  constructor(private httpClientService:HttpClientService ) {

  }

  private apiUrl = environment.baseUrl + "/api/car";

  private getAllCarUrl = "/getCarList";

  getAllCar():Observable<Car[]> {
    return this.httpClientService.getJson(`${this.apiUrl+this.getAllCarUrl}`).pipe(
      map((res:Car[]) => {return res;})
    );
  }

}
