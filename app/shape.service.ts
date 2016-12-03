import { Injectable } from '@angular/core';
import { ShapeModel } from './shape.model';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';
import { Utils } from './utils';

const minWidth: number = 10;

@Injectable()
export class ShapeService{

  static parameters = ['canvasWidth', 'canvasHeight'];

  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth, canvasHeight){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Generate a new valid shape of the given type
   * @param shapeType The type of the shape to return
   * @returns The newly created shape of the given type
   */
  public generateShape(shapeType: string): ShapeModel{
    let result;
    switch(shapeType){
      case CircleModel.CIRCLE_TYPE :
        let r: number =  Utils.randInt(minWidth/2, minWidth*5);
        let cx: number = Utils.randInt(r, this.canvasWidth-r);
        let cy: number = Utils.randInt(r, this.canvasHeight-r);
        result = new CircleModel(cx, cy, r);
        break;
      case SquareModel.SQUARE_TYPE:
        let side: number = Utils.randInt(minWidth, minWidth*10);
        let x: number = Utils.randInt(side, this.canvasWidth-side);
        let y: number = Utils.randInt(side, this.canvasHeight-side);
        result = new SquareModel(x, y, side);
        break;
      default:
    }

    return result;
  }

  /**
   * Divivde the given shape into 2 smaller shape of the same type. The original shape is removed from the board.
   * If the new shapes are smaller than the min dimension for a shape, then the original shape is still removed, but no other shapes are added to the board
   * @param shape The shape to divide
   * @returns an array of ShapeModel containing the 2 new shapes if the division went well, or nothing.
   */
  public divide(shape: ShapeModel): ShapeModel[] {
    let result: ShapeModel[] = new Array<ShapeModel>()

    let newWidth: number = shape.width / 2;

    if(newWidth > minWidth){
    let newShape1x: number = shape.x;
      let newShape1y: number = shape.y;
      let newShape1Width: number = newWidth;
      let newShape1Height: number = newWidth;

      let newShape2x: number = shape.x+newWidth;
      let newShape2y: number = shape.y+newWidth;
      let newShape2Width: number = newWidth;
      let newShape2Height: number = newWidth;

      let shapeType: string = shape.getType();
      switch(shapeType){
        case CircleModel.CIRCLE_TYPE :
          let r: number = newShape1Width/2;
          let cx: number = newShape1x + r;
          let cy: number = newShape1y + r;
          result.push(new CircleModel(cx, cy, r));
          r = newShape2Width/2;
          cx = newShape2x + r;
          cy = newShape2y + r;
          result.push(new CircleModel(cx, cy, r));
          break;
        case SquareModel.SQUARE_TYPE:
          let side: number = newShape1Width;
          let x: number = newShape1x;
          let y: number = newShape1y;
          result.push(new SquareModel(x, y, side));
          side = newShape2Width;
          x = newShape2x;
          y = newShape2y;
          result.push(new SquareModel(x, y, side));
          break;
        default:
      }
    }

    return result;
  }
}
