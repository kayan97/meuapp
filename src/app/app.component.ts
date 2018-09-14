
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TreinamentoPage } from '../pages/treinamento/treinamento';
import { PerfilPage } from '../pages/perfil/perfil';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { DuplaPage } from '../pages/dupla/dupla';

import { AngularFireAuth } from '../../node_modules/angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
 pages: Array<{icon: string, title: string, component: any}>;

 constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    const authObserver = afAuth.authState.subscribe(user =>{
      if (user){
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }else {
        this.rootPage = SigninPage;
        authObserver.unsubscribe();
      }
    });
    this.pages = [
      { icon: "home",title: 'Home', component: HomePage },
      { icon: "home",title: 'Treinamento', component: 'TreinamentoPage' },
      { icon: "home",title: 'Perfil do Jogador', component: 'PerfilPage' },
      { icon: "home",title: 'Estatistica', component: 'EstatisticaPage' },
      { icon: "home",title: 'Dupla', component: 'DuplaPage' },
      { icon: "log-out",title: 'Sair', component: HomePage }

    ];

  platform.ready().then(()=>{
    splashScreen.hide();
  })
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



}
