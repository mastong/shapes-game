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
    <svg attr.width="{{canvasWidth}}" attr.height="{{canvasHeight}}" class="board">
      <g *ngFor="let shape of shapes">
        <g [ngSwitch]="shape.getType()">
          <g *ngSwitchCase="'circle'" circleShape [circleData]="shape" (onDivide)="divide($event)"></g>
          <g *ngSwitchCase="'square'" squareShape [squareData]="shape" (onDivide)="divide($event)"></g>
          <g *ngSwitchDefault><!-- Shape type unknow --></g>
        </g>
      </g>
    </svg>
    <div class="gameData">
    <br>
      <span>Level : {{level}}</span>
      <br>
      <span>Score : {{score}}</span>
      <br>
      <span>Timer : {{timer}}</span>
      <input type="button" (click)="launchNewGame();" value="Launch a new game!" />
    </div>

    <!-- Only here for debug purpose -->
    <div>
      Debug only
      <br>
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

  /*
   * The current level.
   * Each level increase the difficulty
   */
  private level: number = 1;

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
      if(this.shapes.length === 0){
        this.level++;
        this.initNewRound(this.level);
      }
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
    this.level = 1;
    this.initNewRound(this.level);
  }

  /**
   * Init a new round for a given level.
   * Reset the timer and generate a new set of shapes.
   * The higher the level, the more shapes are generated.
   */
  private initNewRound(level: number){
    this.shapes = [];
    for(let i: number = 0; i < level; i++){
      this.shapes.push(this.shapeService.generateShape(this.getRandomShapeType()));
    }
    // TODO Should be calculated from the level
    this.timer = 30+(level-1)*5;
    if(this.timerThreadId){
      clearInterval(this.timerThreadId);
    }
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
