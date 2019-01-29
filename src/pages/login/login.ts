import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Validator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, public alertController: AlertController, private formBuilder: FormBuilder, public storage: Storage) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    })

  }



  signUp() {
    this.navCtrl.push('SignupPage');
  }


  signIn() {
    console.log(this.loginForm.value);

    this.storage.get(this.loginForm.value.userName).then((res) => {
      console.log(res);
      if (this.loginForm.value.passWord == res.passWord) {
        this.storage.set('CurrentUser', this.loginForm.value.userName);
        this.navCtrl.setRoot('TabPage');
      }
      else {
        this.alertMsg();
      }
    })
      .catch((err) => {
        this.alertMsg();
      })

  }

  alertMsg() {
    const alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: ' Username or Password is incorrect!',
      buttons: ['OK']
    });
    alert.present();

  }
}
