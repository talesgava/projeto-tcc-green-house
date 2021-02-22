import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  data: any;
  isLoading = false;
  private api_url: string = 'https://api.thinger.io';
  constructor(public loadingController: LoadingController, public http: HttpClient) { }

  getTemperaturaBucket(items: string) {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };
    return this.http.get(this.api_url + '/v1/users/gavatales/buckets/SensorTemperaturaDiario/data?items=' + items, HttOptions);
  }

  getSoloBucket(items: string) {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };
    return this.http.get(this.api_url + '/v1/users/gavatales/buckets/SensorUmidadeSoloDiario/data?items=' + items, HttOptions);
  }

  getUmidadeArBucket(items: string) {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };
    return this.http.get(this.api_url + '/v1/users/gavatales/buckets/SensorUmidadeArDiario/data?items=' + items, HttOptions);
  }

  getLuminosidadeBucket(items: string) {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };
    return this.http.get(this.api_url + '/v1/users/gavatales/buckets/SensorLuminosidadeDiario/data?items=' + items, HttOptions);
  }

  getTemperaturaPeridiocally() {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };

    return this.http.get(this.api_url + '/v2/users/gavatales/devices/ProjetoTcc/temperature', HttOptions)
  }

  getLuminosidadePeridiocally() {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };

    return this.http.get(this.api_url + '/v2/users/gavatales/devices/ProjetoTcc/luminosity', HttOptions)
  }

  getUmidadeArPeridiocally() {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };

    return this.http.get(this.api_url + '/v2/users/gavatales/devices/ProjetoTcc/humidity', HttOptions)
  }

  getUmidadeSoloPeridiocally() {
    let HttOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJUb2tlblRDQyIsInVzciI6ImdhdmF0YWxlcyJ9.Ihj_D8zdDVDaXt-KBj7wNVfnJpBJ2NxwSQDtAGkQegE`
      })
    };

    return this.http.get(this.api_url + '/v2/users/gavatales/devices/ProjetoTcc/soil', HttOptions)
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Carregando...',
      showBackdrop: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => ('dismissed'));
  }

}
