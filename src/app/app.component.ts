/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "CkZyqQ5T8amnHlCbpXeii46KilPGV5UuOgODqa2neqB4E3OAl9Q0Agmg97eMKXrTNiV2ftJ3EpOlSzGLsC9Rn5HbAmBelUgxZeIVTVR6wDPTPD3fWhHqKNzS02QRSQuvKy8D/HR2NSfqYLvWNElexIqtF0UnipK33xBoqygVA3BTYWx0ZWRfX1HMcS1zqOwGHzw0os4Ex5jFFe3HxI5dpHfrwT+SR4YWFi7c89jy25p8RZi1Tza2Xtkd2sQt2uH3mg7pHm/2G+XUJ+x48o/5xAQKxfhWwGcco24RLUzNIeRAo7pefcIQo4LrTebzkMS5RK5ZxFP6B6bafwR4ug4P5tR45mVwOciCT3eQZgPPPwStmLqNgwNu2WycyjS2R+sGcUk4AeezZuW5E1uQazEqq/+XAX5zT1XzAkqaNV5FDUxVZRiOC5VhzUJyi/OtQuqpmqLjrf8Ak/Bvocs8Ya8Z+dwgWGnKnTBlKxkUiIXnKE+GX/smayT1ZxgLzhtK9wV1fR+lfN63gVadTLGTFMaduQ7IcT99JCl0R+XMxvkgbtW516cN36vmZ6htKXjvTXERWwhc4D4MpqAGVUGEa+Qw4cQkW/JCao13AKpZuwv9y2xSVKwdb65gFV55oM69N3QWkn680e+AyiM+k7we4TwSd7pQM/AB2FZYnMzmSouAnUE=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
       * through the function below for the direction Ionic2 app --> Wikitude SDK
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }

      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );
      */

    });
  }
}
