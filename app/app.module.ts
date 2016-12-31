import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { CircleComponent } from './circle.component';
import { SquareComponent } from './square.component';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

let options: ToastOptions = new ToastOptions({
  positionClass: 'toast-top-center',
  animate: 'fade',
  dismiss: 'click'
});

@NgModule({
  imports:      [ BrowserModule, FormsModule, ToastModule.forRoot(options) ],
  declarations: [
    AppComponent,
    CircleComponent,
    SquareComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
