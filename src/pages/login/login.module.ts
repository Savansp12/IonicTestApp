import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { FormBuilder,FormGroup} from '@angular/forms';

import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    // FormBuilder,
  ],
})
export class LoginPageModule {}
