import { FormModel } from './form.model';

export class SquareModel extends FormModel{
  public x: number;
  public y: number;
  public side: number;

  // TODO Should find a way to use this value directly in the AppComponent template...
  public static SQUARE_TYPE = "square";

  constructor(x: number, y: number, side: number){
    super(x, y, side, side);

    this.x = x;
    this.y = y;
    this.side = side;
  }

  public getType(): string{
    return SquareModel.SQUARE_TYPE;
  }
}
