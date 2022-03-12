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
      this.Listdevices()
    },error=>{
      this.isEnabled("Bluetooth apagado")
    })
  }

  Listdevices(){
    this.bluetootSerial.list().then(response=>{
      this.Devices=response
    },error =>{
      console.log("error")
    })
  }

  connect(address){
    this.bluetootSerial.connect(address).subscribe(success=>{
      console.log("Conectando")
    },error=>{
      console.log("Error")
    });
  }

  deviceConnect(){
    this.bluetootSerial.subscribe('/n').subscribe(success=>{
      this.hundler(success)
    })
  }

  hundler(value){
    console.log("value")
  }

  sebData(){
    this.bluetootSerial.write("7").then(Response=>{
      console.log("listo")
    },error=>{
      console.log("Ocurriop un probglema")
    })
  }
  Disconnected(){
    this.bluetootSerial.disconnect()
    console.log("Device disconnected")
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
