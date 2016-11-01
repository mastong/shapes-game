import { Injectable } from '@angular/core';
import { FormModel } from './form.model';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';

@Injectable()
export class FormService{

  static parameters = ['canvasWidth', 'canvasHeight'];

  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth, canvasHeight){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  public generateForm(formType: string): FormModel{
    let result;
    switch(formType){
      case CircleModel.CIRCLE_TYPE :
        let r: number = this.randInt(0, 30);
        let cx: number = this.randInt(r, this.canvasWidth-r);
        let cy: number = this.randInt(r, this.canvasHeight-r);
        result = new CircleModel(cx, cy, r);
        break;
      case SquareModel.SQUARE_TYPE:
        let side: number = this.randInt(0, 30);
        let x: number = this.randInt(side, this.canvasWidth-side);
        let y: number = this.randInt(side, this.canvasHeight-side);
        result = new SquareModel(x, y, side);
        break;
      default:
    }

    return result;
  }


  private randInt(min: number, max: number): number{
    return (Math.floor(Math.random() * (max-min)) + min);
  }
}
