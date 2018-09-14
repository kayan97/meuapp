import { AuthService } from './../../providers/auth/auth-service';
import { SigninPage } from './../signin/signin';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private AuthService: AuthService){}

  signOut(){
    this.AuthService.signOut()
    .then(()=>{
      this.navCtrl.setRoot(SigninPage);
    })

    .catch((Error)=>{
      console.error(Error);
    });
  }

}
