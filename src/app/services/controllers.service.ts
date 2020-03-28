import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Limb } from '../models/limb';

@Injectable({
  providedIn: 'root'
})
export class ControllersService {
  // Url = "http://localhost:3001/"
  Url = "http://192.168.0.22:3001/"
  constructor( private http: HttpClient) { }

  getControllers(){
    return this.http.get( this.Url +"controllers")
  }
  moveLimb(limb: Limb){
    return this.http.post(this.Url + "move/hand", limb)
  }
  handsUp(){
    return this.http.post(this.Url + "move/handsup",null)
  }
  async listen(){
    setTimeout(() => {
      let sound = localStorage.getItem('command');
      return this.http.post(this.Url + "listen/"+"sound",null)
      // return localStorage.getItem('command');
  }, 2500);
  }
}
