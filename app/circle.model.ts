import { FormModel } from './form.model';

export class CircleModel extends FormModel{
  public centerX: number;
  public centerY: number;
  public radius: number;

  // TODO Should find a way to use this value directly in the AppComponent template...
  public static CIRCLE_TYPE = "circle";

  constructor(centerX: number, centerY: number, radius: number){
    super(centerX-radius, centerY-radius, radius*2, radius*2);

    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }

  public getType(): string{
    return CircleModel.CIRCLE_TYPE;
  }

  public move(maxX: number, maxY: number){
    // TODO use the maxX/maxY to make the circle bounce
    this.centerX += this.dx;
    this.centerY += this.dy;
  }
}
