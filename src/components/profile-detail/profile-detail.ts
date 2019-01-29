import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController, AlertController, Platform, LoadingController } from 'ionic-angular';

import { Validator, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'profile-detail',
  templateUrl: 'profile-detail.html'
})


export class ProfileDetailComponent {
  userImg: string;
  btnName: string;
  private profileForm: FormGroup;
  formErrMsgs: object;
  formData: object;
  @Input() set userDetails(details: any) {
    this.formData = details;
    this.btnName = details.btnName;
    console.log(this.btnName);
    this.updateForm();
  }
  get userDetails() {
    return this.formData;
  }


  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private platform: Platform, public loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController, private storage: Storage, private camera: Camera, public alertCtrl: AlertController, ) {
    console.log('Hello ProfileDetailComponent Component');

    this.profileForm = this.formBuilder.group({

      photo: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      mobileNum: ['', [Validators.required, Validators.minLength(6)]],
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });

    this.formErrMsgs = {
      firstName: "First name field should not be empty",
      lastName: "Last name field should not be empty",
      userName: "User name field should not be empty",
      passWord: "Password should be minimum of 8 character",
      confirmPassword: "Confirm password should be same as password",
      mobileNum: "Phone number length should not be less than 10 ",
      emailId: "Email Id should be valid"
    }

  }

  updateForm() {
    if (this.btnName == "Update") {
      let loader = this.loadingCtrl.create({
        content: 'Loading user details'
      });
      loader.present().then(() => {
        this.storage.get("CurrentUser").then((user) => {
          this.storage.get(user).then((detail) => {
            this.profileForm.setValue(detail);
            this.userImg = detail.photo;
          })
        })

        loader.dismiss();
      })
    }
  }



  selectSource() {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.platform.ready().then(res => {

      this.camera.getPicture({
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType,
        encodingType: this.camera.EncodingType.JPEG,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }).then((imageData) => {
        console.log(imageData);
        if (imageData) {
          this.userImg = `data:image/jpeg;base64,${imageData}`;
          this.profileForm.controls['photo'].setValue(this.userImg);

        }


      })
    })
  }


  alertMsg(title, subTitle) {
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK']
    });
    alert.present();
  }


  signUp() {
    if ((this.profileForm.value.passWord == this.profileForm.value.confirmPassword)) {
      this.alertMsg('Success!', 'Your account got created successfully');
      this.storage.set(this.profileForm.value.userName, this.profileForm.value);
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.alertMsg('Error!', 'Kindly re-verify your password');
    };
  }

  update() {
    this.storage.set(this.profileForm.value.userName, this.profileForm.value);
    this.alertMsg('Success!', 'Fields are updated successfully');
  }
}

