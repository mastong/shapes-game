import { Injectable } from '@angular/core';
import { FormModel } from './form.model';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';

const minWidth: number = 10;

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
        let r: number = this.randInt(minWidth/2, 15);
        let cx: number = this.randInt(r, this.canvasWidth-r);
        let cy: number = this.randInt(r, this.canvasHeight-r);
        result = new CircleModel(cx, cy, r);
        break;
      case SquareModel.SQUARE_TYPE:
        let side: number = this.randInt(minWidth, 30);
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

  public divide(form: FormModel): FormModel[] {
    let result: FormModel[] = new Array<FormModel>()

    let newWidth: number = form.width / 2;

    if(newWidth > minWidth){


      let newForm1x: number = form.x;
      let newForm1y: number = form.y;
      let newForm1Width: number = newWidth;
      let newForm1Height: number = newWidth;

      let newForm2x: number = form.x+newWidth;
      let newForm2y: number = form.y+newWidth;
      let newForm2Width: number = newWidth;
      let newForm2Height: number = newWidth;

      let formType: string = form.getType();
      switch(formType){
        case CircleModel.CIRCLE_TYPE :
          let r: number = newForm1Width/2;
          let cx: number = newForm1x + r;
          let cy: number = newForm1y + r;
          result.push(new CircleModel(cx, cy, r));
          r = newForm2Width/2;
          cx = newForm2x + r;
          cy = newForm2y + r;
          result.push(new CircleModel(cx, cy, r));
          break;
        case SquareModel.SQUARE_TYPE:
          let side: number = newForm1Width;
          let x: number = newForm1x;
          let y: number = newForm1y;
          result.push(new SquareModel(x, y, side));
          side = newForm2Width;
          x = newForm2x;
          y = newForm2y;
          result.push(new SquareModel(x, y, side));
          break;
        default:
      }
    }

    return result;
  }
}
