import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CarHttpService} from "./service/car.service";
import {
  MainContentComponent,
  AddCarDialogWindow,
  EditCarDialogWindow
} from './component/main-content/main-content.component';
import {HttpClientService, httpClientServiceCreator} from "./service/httpClient.service";
import {HttpHandler} from "@angular/common/http";
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraMaterialModule } from "./model/material-module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    AddCarDialogWindow,
    EditCarDialogWindow
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    ExtraMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CarHttpService,
    {provide:HttpClientService, useFactory:httpClientServiceCreator, deps:[HttpHandler]}
  ],
  entryComponents: [MainContentComponent, AddCarDialogWindow, EditCarDialogWindow],
  bootstrap: [AppComponent]
})
export class AppModule { }
