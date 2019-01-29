import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GmapPage } from './gmap';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


@NgModule({
  declarations: [
    GmapPage,
  ],
  imports: [
    IonicPageModule.forChild(GmapPage),
  ],
  providers:[
    NativeGeocoder,
    Geolocation,
    OpenNativeSettings
  ]
})
export class GmapPageModule {}
