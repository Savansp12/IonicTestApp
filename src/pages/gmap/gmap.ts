import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController ,LoadingController} from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@IonicPage()
@Component({
  selector: 'page-gmap',
  templateUrl: 'gmap.html',
})
export class GmapPage {
  map: GoogleMap;
  address: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private platform: Platform,
    private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController, public openNativeSettings: OpenNativeSettings,private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    this.getLoaction();
  }


  getLoaction() {
    this.platform.ready().then(() => {
      let loader = this.loadingCtrl.create({
        content: 'Fetching geoloacation...'
      });
      loader.present().then(() => {
            var options = {
              timeout: 10000
              , enableHighAccuracy: true
            };
            this.geolocation.getCurrentPosition(options)
              .then((resp) => {
                this.geoCode(resp.coords);
                this.loadMap(resp.coords);
              }).catch((error) => {
                console.log('Error getting location', error);
              
            const alert = this.alertCtrl.create({
              title: "Unable to locate you",
              subTitle: "Turn ON the GPS and try again",
              buttons: [
                {
                  cssClass: 'Cancel',
                  text: "Cancel",

                  handler: data => {
                  },
                },

                {
                  cssClass: 'Settings',
                  text: "Settings",

                  handler: data => {
                    this.openNativeSettings.open('location')
                      .then(res => {
                        let backgroundEnabled = this.platform.resume.subscribe(() => {
                          this.getLoaction();
                          // do something meaningful when the app is put in the foreground
                          backgroundEnabled.unsubscribe();

                        });
                      })
                  }
                }]

            })
            alert.present();
          })
    loader.dismiss();
      })
    })
  }


  geoCode(l) {
    // Convert GPS co-ordonate into country code
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 10
    };

    this.nativeGeocoder.reverseGeocode(l.latitude, l.longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        console.log(result);
        this.address = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ',' + result[0].subLocality + ',' + result[0].locality + ',' +
          result[0].postalCode + ',' + result[0].countryName;
      }
      )
      .catch((error: any) => console.log(error));
  }

  loadMap(l) {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: l.latitude,
          lng: l.longitude
        },
        zoom: 12,
        tilt: 30
      }
    };
    this.platform.ready().then(() => {

      this.map = GoogleMaps.create('map', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: 'Current Location',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: l.latitude,
          lng: l.longitude
        }
      })
    })
  }
}
