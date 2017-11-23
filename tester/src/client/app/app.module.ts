import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// routes
import { appRoutes } from "./app.route";

// components
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { Page1Component } from './page1/page1.component';


@NgModule({
  imports: [
    BrowserModule,

    appRoutes
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component,
    Page1Component
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }