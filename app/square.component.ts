import { Component, Input } from '@angular/core';
import { SquareModel } from './square.model';

@Component({
  selector: '[squareForm]',
  template: '<svg:rect attr.x="{{ squareData.x }}" attr.y="{{ squareData.y }}" attr.width="{{ squareData.side }}" attr.height="{{ squareData.side }}" fill="green" (click)="divide()"></rect>'
})
export class SquareComponent {
  @Input()
  squareData: SquareModel;

  public divide(): void{
    console.log("The square at (%s,%s) with size %s should divivde", this.squareData.x, this.squareData.y, this.squareData.side);
  }
}
