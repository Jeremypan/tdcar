import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpClientService extends HttpClient {
   constructor(private httpHandler:HttpHandler)  {
     super(httpHandler);
   }

   private handleError( httpResponse:HttpErrorResponse){
      alert(httpResponse.error);
   }

   get(url:string): Observable<any> {
      return super.get<any>(url)
        .pipe(
        catchError(async (err) => this.handleError(err))
      );
   }

   getJson<T>(url:string): Observable<any> {
     return super.get(url, {headers: new HttpHeaders({
         contentType:'application/json', Accept: 'application/json'
       })}).pipe(
         catchError (async (err) => this.handleError(err))
     );
   }

   postJSONWithRequestBody<T> (url:string, body:any): Observable<any> {
     return super.post(url,body,{headers: new HttpHeaders({
         contentType:'application/json', Accept: 'application/json'
       })}).pipe(
         catchError(async (err) => this.handleError(err))
     );
   }

}

export function httpClientServiceCreator(httpHandler:HttpHandler) {
  return new HttpClientService(httpHandler);
}
