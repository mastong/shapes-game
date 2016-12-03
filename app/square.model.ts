import { ShapeModel } from './shape.model';

export class SquareModel extends ShapeModel{

  // TODO Should find a way to use this value directly in the AppComponent template...
  public static SQUARE_TYPE = "square";

  constructor(x: number, y: number, side: number){
    super(x, y, side, side);
  }

  /** @override ShapeModel*/
  public getType(): string{
    return SquareModel.SQUARE_TYPE;
  }
}
