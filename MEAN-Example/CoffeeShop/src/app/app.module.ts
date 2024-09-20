import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from '@angular/common';
// HTTP client module for API communication
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// API Service
import { DataService } from './data.service';

// Angular Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

// Our pages
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        ProductsComponent,
        CartComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        CurrencyPipe], providers: [DataService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
