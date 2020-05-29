import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly platform: Platform,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      try {
        SplashScreen.show({
          showDuration: 3000,
          autoHide: true
        });

        StatusBar.setStyle({ style: StatusBarStyle.Light });
      } catch (err) {
        console.log('This does not have influence on the browser', err);
      }

    });
  }
}
