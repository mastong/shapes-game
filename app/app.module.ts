import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { CircleComponent } from './circle.component';
import { SquareComponent } from './square.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    CircleComponent,
    SquareComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
