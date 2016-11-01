import { Component, Input } from '@angular/core';
import { CircleModel } from './circle.model';

@Component({
  selector: '[circleForm]',
  template: '<svg:circle attr.cx="{{ circleData.centerX }}" attr.cy="{{ circleData.centerY }}" attr.r="{{ circleData.radius }}"  fill="yellow" (click)="divide()"></circle>'
})
export class CircleComponent {
  @Input()
  circleData: CircleModel;

  public divide(): void{
    console.log("The circle at (%s,%s) with radius %s should divivde", this.circleData.centerX, this.circleData.centerY, this.circleData.radius);
  }
}
