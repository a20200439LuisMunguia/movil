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
  isDiabled1=true;
  isDiabled2=false;
  ishidden = false;

  BTon(){
    this.bluetootSerial.isEnabled().then(Response=>{
      this.isEnabled("Bluetooth encendido");
      this.Listdevices()
      this.ishidden = false;
    },error=>{
      this.isEnabled("Bluetooth apagado")
    })
  }

  listoff(){
    this.ishidden=true;
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
      this.isDiabled1=false;
      this.isDiabled2=true;
      alert("Conectado")

    },error=>{
      alert("Error")
    });
  }

  Disconnected(){
    this.bluetootSerial.disconnect()
    console.log("Device disconnected")
    this.isDiabled2=false;
    this.isDiabled1=true;
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

  prender(){
    this.bluetootSerial.write("0")

  }
  apagar(){
    this.bluetootSerial.write("1")
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
