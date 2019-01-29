import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { TabPage } from '../pages/tab/tab';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  backButtonPressedOnceToExit: boolean = false; //to handle hardware back button
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public toastCtrl: ToastController,
    public app: App, private ionicApp: IonicApp) {
    this.rootPage = "LoginPage"
    this.platform.ready().then(() => {
      //For handling hardware back button
      let lastTimeBackPress = 0;
      let timePeriodToExit = 2000;
      let ready = true;
      this.platform.registerBackButtonAction(() => {
        console.log("HARDWARE BACK CLICKED");


        let view = this.nav.getActive();
        console.log("View component:    ", view.component);

        if (this.nav.canGoBack()) {
          this.nav.pop({});
        }
        else if (view.component == LoginPage || view.component == TabPage) {
          console.log("i am in LOGIN PAGE");
          //Double check to exit app
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            this.platform.exitApp(); //Exit from app
          } else {

            let toast = this.toastCtrl.create({
              message: 'Press back again to exit',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        }
        else {
          this.nav.setRoot("LoginPage", {}, { animate: true, animation: 'wp-transition', direction: 'backward' });

        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

  }
}