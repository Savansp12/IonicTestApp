import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    ComponentsModule,
    
  ],

  providers:[
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
 
})
export class SignupPageModule {}
