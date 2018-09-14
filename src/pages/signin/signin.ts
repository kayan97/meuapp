import { User } from '../../providers/auth/user';
import { HomePage } from './../home/home';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
import { AuthService } from './../../providers/auth/auth-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SignupPage } from '../signup/signup';



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
 @ViewChild('form') Form: NgForm;
 
 constructor(
              public navCtrl: NavController, 
              private ToastCtrl: ToastController, 
              private AuthService: AuthService){

}

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

  Resetpassword(){
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn(){
    if (this.Form.form.valid){
      this.AuthService.signIn(this.user)
      .then(()=> {
        this.navCtrl.setRoot(HomePage)
      })
      .catch((Error: any)=>{
        let toast = this.ToastCtrl.create({ duration:3000, position: 'bottom'});
        if (Error.code == 'auth/invalid-email'){
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (Error.code == 'auth/user-disable'){
          toast.setMessage('O usuário está desativado.');
        } else if (Error.code == 'auth/user-not-found'){
          toast.setMessage('O usuário não foi encontrado');
        } else if (Error.code == 'auth/wrong-password'){
          toast.setMessage('A senha digitada não é válida.');
        }
        toast.present();
        });
    }
  }
}

