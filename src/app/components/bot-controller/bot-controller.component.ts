import { Component, OnInit } from '@angular/core';
import { ControllersService } from '../../services/controllers.service';
import { Limb } from '../../models/limb';
import { async } from '@angular/core/testing';
declare function init(): any;
@Component({
  selector: 'app-bot-controller',
  templateUrl: './bot-controller.component.html',
  styleUrls: ['./bot-controller.component.css']
})
export class BotControllerComponent implements OnInit {
  // limb: Limb
  controls: any[] = []
  constructor(private controllersService: ControllersService) { }

  ngOnInit(): void {
    this.controllersService.getControllers().subscribe(data =>{
      this.controls = data['controllers']
      console.log(this.controls);
      
    })
  }
  move(i: string, value: any){
    console.log(i);
    console.log(value);
    var limb ={
      id: i,
      value: value
    }
    // this.limb.id = i
    // this.limb[value] = value
    console.log(limb);
    
    this.controllersService.moveLimb(limb).subscribe(data =>{
      console.log(data);
      
    })
    
  }
  handsUp(){
    this.controllersService.handsUp().subscribe(data =>{})
  }

  async initi(){
    // console.log(init());
    let va = await init()
    console.log( this.controllersService.listen());
   
    
    
  }

}
