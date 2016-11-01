export abstract class FormModel {


  public x: number;
  public y: number;
  public width: number;
  public height: number;

  // movement direction and speed
  public dx: number;
  public dy: number;

  constructor(x: number, y: number, width: number, height: number){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    this.dx = Math.random()*this.width/2;
    this.dy = Math.random()*this.height/2;
  }


  public move(maxX: number, maxY: number){
    let newX: number;
    newX = this.x + this.dx;
    if(newX < 0 || newX + this.width > maxX){
      this.dx = -1*this.dx;
      newX = this.x + this.dx;
    }
    let newY: number;
    newY = this.y + this.dy;
    if(newY < 0 || newY + this.height > maxY){
      this.dy = -1*this.dy;
      newY = this.y + this.dy;
    }
    this.x = newX;
    this.y = newY;
  }

  abstract getType(): string;
}
