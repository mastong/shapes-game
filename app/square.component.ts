import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquareModel } from './square.model';

@Component({
  selector: '[squareShape]',
  template: '<svg:rect attr.x="{{ squareData.x }}" attr.y="{{ squareData.y }}" attr.width="{{ squareData.width }}" attr.height="{{ squareData.height }}" fill="green" (mousedown)="divide()" class="shape"></rect>'
})
export class SquareComponent {
  @Input()
  squareData: SquareModel;
  @Output()
  onDivide = new EventEmitter<SquareModel>();

  public divide(): void{
    this.onDivide.emit(this.squareData);
  }
}
