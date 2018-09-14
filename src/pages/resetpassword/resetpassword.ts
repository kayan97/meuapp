import { AuthService } from './../../providers/auth/auth-service';
import { NgForm } from '@angular/forms';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  userEmail: string = '';
  @ViewChild('form') form: NgForm;
  
  constructor(
              public navCtrl: NavController,
              private toastCtrl: ToastController, 
              private AuthService: AuthService){
  }

  resetPassword(){
    if (this.form.form.valid){
      let toast = this.toastCtrl.create({duration: 3000, position:'bottom'});
      this.AuthService.resetPassword(this.userEmail)
      .then(()=>{
          toast.setMessage('Solicitação foi enviada para o seu e-mail.')
          toast.present();

          this.navCtrl.pop()
      })
      .catch((Error: any)=>{
          if (Error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido');
          }else if (Error.code == 'auth/user-not-found'){
            toast.setMessage('O usuário não foi encontrado');
          }

          toast.present();
      });
    }
  }

}
