import { Component } from '@angular/core';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';
import { ShapeModel } from './shape.model';
import { ShapeService } from './shape.service';
import { Utils } from './utils';

@Component({
  selector: 'my-app',
  template: `
    <h1>Let's play with shapes!</h1>
    <svg attr.width="{{canvasWidth}}" attr.height="{{canvasHeight}}" style="background-color:gray">
      <g *ngFor="let shape of shapes">
        <g [ngSwitch]="shape.getType()">
          <g *ngSwitchCase="'circle'" circleShape [circleData]="shape" (onDivide)="divide($event)"></g>
          <g *ngSwitchCase="'square'" squareShape [squareData]="shape" (onDivide)="divide($event)"></g>
          <g *ngSwitchDefault><!-- Shape type unknow --></g>
        </g>
      </g>
    </svg>
    <br>
    <span>Score : {{score}}</span>
    <br>
    <span>Timer : {{timer}}</span>
    <br>
    <input type="button" (click)="launchNewGame();" value="Launch a new game!" />
    <!-- Only here for debug purpose -->
    <div>
      <select [(ngModel)]="currentShapeType">
        <option *ngFor="let shapeType of shapeTypes" [value]="shapeType">{{shapeType}}</option>
      </select>
      <input type="button" (click)="add();" value="Add Shape" />
    </div>
  `,
  providers: [ShapeService]
})
export class AppComponent {

  /**
   * The timer duration
   */
  private timer: number;
  /**
   * The technical id used to stop a timer once it's started
   */
  private timerThreadId: any;

  /**
   * all the shape types handled by the application
   */
  private shapeTypes: Array<string> = ['circle', 'square'];
  /**
   * the current shape type that will be added on the add button click
   * Not sure if this property will be kept in the future, when the shapes will be added in a more automatic way
   */
  private currentShapeType: string;
  /**
   * all the shapes currently on the board
   */
  private shapes: ShapeModel[] = [];

  /**
   * Indicate if the game is currently on or not.
   */
  private running: boolean = false;

  /**
   * The current score
   */
  private score: number = 0;

  static parameters = ['canvasWidth', 'canvasHeight', ShapeService];
  constructor(private canvasWidth: number, private canvasHeight: number, private shapeService: ShapeService){  }

  public ngOnInit() {
    //this.running = true;
    //this.moveShapes();
  }

  /**
   * Add a new shape to the board, based on the type selected in the select.
   * Only present during the dev, but will be removed/replaced later by some kind of automatic process
   */
  public add(): void{
    if(!this.currentShapeType){
      console.warn("No shape type selected..")
      return;
    }

    this.shapes.push(this.shapeService.generateShape(this.currentShapeType));
  }

  /**
   * Update the position of all the shapes on the board.
   * This method will be called at each navigator refresh
   */
  public moveShapes(){
    this.shapes.forEach((shape: ShapeModel) =>{
      shape.move(this.canvasWidth, this.canvasHeight);
    });
    if(this.running){
      requestAnimationFrame(()=> this.moveShapes());
    }
  }

  /**
   * Remove the given shape from the board, and replace it with the result of it's division, if any
   * @param shape The shape to remove from the board and divide
   */
  public divide(shape: ShapeModel): void{
    if(this.running){
      let newShapes: ShapeModel[] = this.shapeService.divide(shape);
      let index: number = this.shapes.indexOf(shape);
      this.shapes.splice(index, 1);
      newShapes.forEach((shape: ShapeModel) =>{
        this.shapes.push(shape);
      });

      this.score += shape.getScoreValue();
    }
  }

  /**
   * Start a game by :
   * - resetting the score to 0
   * - resetting the timer
   * - clearing the board
   * - generating a new set of shapes
   */
  public launchNewGame(){
    this.score = 0;
    this.shapes = [];
    // TODO The min and max nb of shapes must be in variable, to be able to update it with the game difficulty
    let nbShapes: number = Utils.randInt(1, 20);
    for(let i: number = 0; i < nbShapes; i++){
      this.shapes.push(this.shapeService.generateShape(this.getRandomShapeType()));
    }
    // TODO Should be a variable, to be able to update it with the game difficulty
    this.timer = 10;
    this.timerThreadId = setInterval(this.decreaseTimer, 1000, this);
    this.running = true;
    this.moveShapes();
  }

  /**
   * Decrement the timer by one. Must be called every second.
   * When the timer reach 0, end the game
   * @param context The object representing the game
   */
  private decreaseTimer(context: AppComponent): void{
    console.log("decreaseTimer");
    context.timer--;
    if(context.timer === 0){
      context.running = false;
      clearInterval(context.timerThreadId);
      // TODO Should display the final score in a more friendly way
      alert("Score "+context.score);
    }
  }

  /**
   * Return a shape type randomly chosen from all the currently available type
   * @returns the chosen shape type name
   */
  private getRandomShapeType(): string{
    return this.shapeTypes[Utils.randInt(0, this.shapeTypes.length-1)];
  }

  //************** Debug functions, not used *****************************
  private debugShapes(){
    console.log("Shapes :");
    this.shapes.forEach((shape: ShapeModel)=>{
      console.log(shape);
    });
  }

  public toggleRunning(){
    this.running = !this.running;
    if(this.running){
      requestAnimationFrame(()=> this.moveShapes());
    }
  }
  //**********************************************************************
}
