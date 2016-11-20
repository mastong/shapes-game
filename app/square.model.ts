import { FormModel } from './form.model';

export class SquareModel extends FormModel{

  // TODO Should find a way to use this value directly in the AppComponent template...
  public static SQUARE_TYPE = "square";

  constructor(x: number, y: number, side: number){
    super(x, y, side, side);
  }

  /** @override FormModel*/
  public getType(): string{
    return SquareModel.SQUARE_TYPE;
  }
}
