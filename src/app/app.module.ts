import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {GridComponent} from "./grid/grid.component";
import {GridUserEditComponent} from "./grid/grid-user-edit/grid-user-edit.component";
import {DarkModeToggle} from "./header/dark-mode-switch/dark-mode-switch.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    GridComponent,
    GridUserEditComponent,
    DarkModeToggle
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
