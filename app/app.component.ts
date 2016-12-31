import { Component } from '@angular/core';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';
import { ShapeModel } from './shape.model';
import { ShapeService } from './shape.service';
import { Utils } from './utils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-app',
  template: `
    <div class=".container-fluid">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <h1 class="title">Let's play with shapes!</h1>
        </div>
        <div class="col-md-4"></div>
      </div>
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <svg attr.width="{{canvasWidth}}" attr.height="{{canvasHeight}}" class="board">
            <g *ngFor="let shape of shapes">
              <g [ngSwitch]="shape.getType()">
                <g *ngSwitchCase="'circle'" circleShape [circleData]="shape" (onDivide)="divide($event)"></g>
                <g *ngSwitchCase="'square'" squareShape [squareData]="shape" (onDivide)="divide($event)"></g>
                <g *ngSwitchDefault><!-- Shape type unknow --></g>
              </g>
            </g>
          </svg>
        </div>
        <div class="col-md-4"></div>
      </div>
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
        <!-- TODO Should use the canvasWidth variable, but angular won't let me do it :( -->
          <div class="gameData" style="width: 500;">
            <span>Level : {{level}}</span>
            <span>Score : {{score}}</span>
            <span>Timer : {{timer}}</span>
            <button class="btn btn-success" type="button" (click)="launchNewGame();">Launch a new game!</button>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
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

  static parameters = [ToastsManager, 'canvasWidth', 'canvasHeight', ShapeService];
  constructor(public toastr: ToastsManager, private canvasWidth: number, private canvasHeight: number, private shapeService: ShapeService){ }

  public ngOnInit() {
    //this.running = true;
    this.moveShapes();
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
    if(this.running){
      this.shapes.forEach((shape: ShapeModel) =>{
        shape.move(this.canvasWidth, this.canvasHeight);
      });
    }
    requestAnimationFrame(()=> this.moveShapes());
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
      context.toastr.success("Your score : "+context.score, "Game Over");
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
