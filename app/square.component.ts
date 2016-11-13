import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquareModel } from './square.model';

@Component({
  selector: '[squareForm]',
  template: '<svg:rect attr.x="{{ squareData.x }}" attr.y="{{ squareData.y }}" attr.width="{{ squareData.side }}" attr.height="{{ squareData.side }}" fill="green" (click)="divide()"></rect>'
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
