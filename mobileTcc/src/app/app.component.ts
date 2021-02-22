import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Pagina inicial',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Luminosidade',
      url: '/luminosidade',
      icon: 'sunny'
    },
    {
      title: 'Temperatura',
      url: '/temperatura',
      icon: 'thermometer'
    },
    {
      title: 'Umidade ar',
      url: '/umidade-ar',
      icon: 'cloudy'
    },
    {
      title: 'Umidade solo',
      url: '/umidade-solo',
      icon: 'leaf'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
