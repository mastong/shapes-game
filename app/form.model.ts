/**
 * Define the bases of every form use in the application.
 * Every form is defined by :
 * - an upper left corner
 * - a width and a height
 * for a "box" that contains it, so that the width and height are the smallest possible
 * For instance, in the case of a square, the box is the form itself.
 * For a circle, the box is a square, where each side are tangent to the circle
 */
export abstract class FormModel {

  /**
   * The x coordinate of the upper left corner of the form (or the box containing it)
   */
  public x: number;
  /**
   * The y coordinate of the upper left corner of the form (or the box containing it)
   */
  public y: number;
  /**
   * The width of the form (or the box containing it)
   */
  public width: number;
  /**
   * The height of the form (or the box containing it)
   */
  public height: number;

  /**
   * Direction and speed of the form on the x axe
   */
  public dx: number;
  /**
   * Direction and speed of the form on the y axe
   */
  public dy: number;

  constructor(x: number, y: number, width: number, height: number){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    this.dx = Math.random()*this.width/10;
    this.dy = Math.random()*this.height/10;
  }

  /**
   * Move the form accordind to its direction.
   * If the form should go out of the board, invert the direction to make the form "bounce back of the wall"
   * Assume the min value for the x and the y coordinate is 0.
   * @param maxX the max value accepted for the x coordinate. Over it, the form will be out of the board
   * @param maxY the max value accepted for the y coordinate. Over it, the form will be out of the board
   */
  public move(maxX: number, maxY: number): void{
    let newX: number;
    newX = this.x + this.dx;
    if(this.x === 0 || (this.x+ this.width) === maxX){
      this.dx = -1*this.dx;
      newX = this.x + this.dx;
    }else if(newX < 0){
      newX = 0;
    } else if( newX + this.width > maxX){
      newX = maxX - this.width;
    }

    let newY: number;
    newY = this.y + this.dy;
    if(this.y === 0 || (this.y + this.height) === maxY){
      this.dy = -1*this.dy;
      newY = this.y + this.dy;
    }else if( newY < 0 ) {
      newY = 0;
    } else if( newY + this.height > maxY ) {
      newY = maxY - this.height;
    }

    this.setX(newX);
    this.setY(newY);
  }

  /**
   * Return the form's type
   * @returns a string corresponding to the type of the form
   */
  abstract getType(): string;

  /**
   * Update the x property
   * @param x the new x value
   */
  public setX(x: number): void{
    this.x = x;
  }

  /**
   * Update the y property
   * @param y the new y value
   */
  public setY(y: number): void{
    this.y = y;
  }

  /**
   * Return the value of the current state of the form.
   * The smaller the form, the bigger the point
   * @returns the form's score value, in it's current form
   */
  public getScoreValue(): number{
    return Math.trunc(100 / this.width);
  }
}
