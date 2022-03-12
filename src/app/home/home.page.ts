import { Component } from '@angular/core';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
Devices
  constructor(private bluetootSerial:BluetoothSerial,private alerController:AlertController) {}

  BTon(){
    this.bluetootSerial.isEnabled().then(Response=>{
      this.isEnabled("Bluetooth encendido");
      this.Listevices()
    },error=>{
      this.isEnabled("Bluetooth apagado")
    })
  }

  Listevices(){
    this.bluetootSerial.list(),then(response=>{
      this.Devices :response
    },error =>{
      console.log("error")
    })
  }

  async isEnabled(msg){
    const alert = await this.alerController.create({
      header:'Alerta',
      message: msg,
      buttons:[{
        text:'okay',
        handler:()=>{
          console.log("okay")
        }

      }]
    })
  }

}
