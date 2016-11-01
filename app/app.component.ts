import { Component } from '@angular/core';
import { CircleModel } from './circle.model';
import { SquareModel } from './square.model';
import { FormModel } from './form.model';
import { FormService } from './form.service';


@Component({
  selector: 'my-app',
  template: `
    <h1>Let's play with forms!</h1>
    <svg attr.width="{{canvasWidth}}" attr.height="{{canvasHeight}}" style="background-color:gray" (click)="toggleRunning()">
      <g *ngFor="let form of forms">
        <g [ngSwitch]="form.getType()">
          <g *ngSwitchCase="'circle'" circleForm [circleData]="form"></g>
          <g *ngSwitchCase="'square'" squareForm [squareData]="form"></g>
          <g *ngSwitchDefault><!-- Form type unknow --></g>
        </g>
      </g>
    </svg>
    <div>
      <select [(ngModel)]="currentFormType">
        <option *ngFor="let formType of formTypes" [value]="formType">{{formType}}</option>
      </select>
      <input type="button" (click)="add();" value="Add Form" />
    </div>
  `,
  providers: [FormService]
})
export class AppComponent {

  // all the form types handled by the application
  private formTypes: Array<string> = ['circle', 'square', 'triangle'];
  // the current form type that will be added on the add button click
  private currentFormType: string;
  // all the forms currently instanciated and displayed on the screen
  private forms: FormModel[] = [];

  private running: boolean = false;

  static parameters = ['canvasWidth', 'canvasHeight', FormService];
  constructor(private canvasWidth: number, private canvasHeight: number, private formService: FormService){  }

  public ngOnInit() {
    /*let that = this;
    setInterval(() => {
      console.log("Move all forms");
      that.moveForms();
    }, 1000);*/
    this.running = true;
    this.moveForms();
  }

  // add a new form to the screen
  public add(): void{
    if(!this.currentFormType){
      console.warn("No form type selected..")
      return;
    }

    console.log("Current form type selected : %s", this.currentFormType);
    this.forms.push(this.formService.generateForm(this.currentFormType));
  }

  public moveForms(){
    this.forms.forEach((form: FormModel) =>{
      form.move(this.canvasWidth, this.canvasHeight);
    });
    if(this.running){
      requestAnimationFrame(()=> this.moveForms());
    }
  }

  private debugForms(){
    console.log("Forms :");
    this.forms.forEach((form: FormModel)=>{
      console.log(form);
    });
  }

  public toggleRunning(){
    this.running = !this.running;
    if(this.running){
      requestAnimationFrame(()=> this.moveForms());
    }
  }
}
