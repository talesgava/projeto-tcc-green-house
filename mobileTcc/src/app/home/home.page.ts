import { Component } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ApiService } from '../service/api/api.service';
import { interval, Subscription, Observable, timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  temperaturaPeridioca: any;
  luminosidadePeriodica: any;
  umidadeSoloPeriodica: any;
  umidadeArPeriodica: any;

  public luminosidade: GoogleChartInterface;
  public temperatura: GoogleChartInterface;
  public umidadeAr: GoogleChartInterface;
  public umidadeSolo: GoogleChartInterface;
  chartTemperaturaPeriodica = [];
  chartLuminosidadePeriodica = [];
  chartUmidadeSoloPeriodica = [];
  chartUmidadeArPeriodica = [];

  subscription: Subscription;
  continua = true
  intervalo = 1;
  constructor(private apiService: ApiService) { }

  

  async ionViewDidEnter() {
    this.apiService.present();
    await this.getDataDeviceApiTemperaturaSeconds();
    await this.getDataDeviceApiLuminosidadeSeconds();
    await this.getDataDeviceApiUmidadeArSeconds();
    await this.getDataDeviceApiUmidadeSoloSeconds();
    this.loadColumnChartTemperature();
    this.loadColumnChartLuminosity();
    this.loadColumnChartSoil();
    this.loadColumnChartAir();
    this.apiService.dismiss();
    setInterval((val) => {this.getDataDeviceApiTemperaturaSeconds()},5000);
    //setInterval((val) => {this.getDataDeviceApiLuminosidadeSeconds()},1000);
  }

  getDataDeviceApiTemperaturaSeconds() {
    return new Promise((resolve, reject) => {
        this.apiService.getTemperaturaPeridiocally().subscribe(
          response => {
            this.temperaturaPeridioca = response;
            this.temperaturaPeridioca = +this.temperaturaPeridioca.out;
            var data = new Date();
            this.chartTemperaturaPeriodica.push(data, this.temperaturaPeridioca, 30)
            console.log(this.chartTemperaturaPeriodica)
            console.log(this.chartTemperaturaPeriodica.length);
            if (this.chartTemperaturaPeriodica.length > 9) {
                this.chartTemperaturaPeriodica.pop[0]
                this.chartTemperaturaPeriodica.pop[1]
                this.chartTemperaturaPeriodica.pop[2]
            }
            if (this.temperatura){
              this.temperatura.formatters.
            }
            resolve();
          },
          err => {
            console.log(err.error);
            reject();
          }
        )
    })
  };

  

  getDataDeviceApiUmidadeArSeconds() {
    return new Promise((resolve, reject) => {
        this.apiService.getUmidadeArPeridiocally().subscribe(
          response => {
            this.umidadeArPeriodica = response;
            this.umidadeArPeriodica = +this.umidadeArPeriodica.out;
            console.log(this.umidadeArPeriodica);
            var data = new Date();
            this.chartUmidadeArPeriodica.push(data, this.umidadeArPeriodica, 30)
            console.log(this.chartUmidadeArPeriodica)
            resolve();
          },
          err => {
            console.log(err.error);
            reject();
          }
        )
    })
  };

  getDataDeviceApiUmidadeSoloSeconds() {
    return new Promise((resolve, reject) => {
        this.apiService.getUmidadeSoloPeridiocally().subscribe(
          response => {
            this.umidadeSoloPeriodica = response;
            this.umidadeSoloPeriodica = +this.umidadeSoloPeriodica.out;
            console.log(this.umidadeSoloPeriodica);
            var data = new Date();
            this.chartUmidadeSoloPeriodica.push(data, this.umidadeSoloPeriodica, 30)
            console.log(this.chartUmidadeSoloPeriodica)
            resolve();
          },
          err => {
            console.log(err.error);
            reject();
          }
        )
    })
  };

  getDataDeviceApiLuminosidadeSeconds() {
    return new Promise((resolve, reject) => {
        this.apiService.getLuminosidadePeridiocally().subscribe(
          response => {
            this.luminosidadePeriodica = response;
            this.luminosidadePeriodica = +this.luminosidadePeriodica.out;
            console.log(this.luminosidadePeriodica);
            var data = new Date();
            this.chartLuminosidadePeriodica.push(data, this.luminosidadePeriodica, 30)
            console.log(this.chartLuminosidadePeriodica)
            resolve();
          },
          err => {
            console.log(err.error);
            reject();
          }
        )
    })
  };

  loadColumnChartLuminosity() {
    var ton = this.chartLuminosidadePeriodica
    console.log(ton)
    this.luminosidade = {
      chartType: 'LineChart',
      dataTable: [
        ['Horario', 'Valores em tempo real de luminosidade', 'Valor ideal'],
        [String(this.chartLuminosidadePeriodica[0]),this.chartLuminosidadePeriodica[1],this.chartLuminosidadePeriodica[2]],
      ],
      options: {
        legend: { position: 'none' },
        series: {
          0: { color: '#e2431e' },
          1: { color: '#11d92c' }
        },
        title: 'Sensor de luminosidade',
        hAxis: {
          title: 'Horário',
        },
        vAxis: {
          title: 'Valor',
          minValue: 0,
          maxValue: 100
        }
      },
    };
  }

  loadColumnChartTemperature() {
    this.temperatura = {
      chartType: 'LineChart',
      dataTable: [
        ['Horario', 'Valores em tempo real de luminosidade', 'Valor ideal'],
        [String(this.chartTemperaturaPeriodica[0]),this.chartTemperaturaPeriodica[1],this.chartTemperaturaPeriodica[2]],
      ],
      options: {
        animation: {
          duration: 1000,
          easing: 'out',
        },
        legend: { position: 'none' },
        series: {
          0: { color: '#e2431e' },
          1: { color: '#11d92c' }
        },
        title: 'Sensor de temperatura',
        hAxis: {
          title: 'Horário',
          fontName: 'Arial',
        },
        vAxis: {
          minValue: 0,
          title: 'Valor',
          fontName: 'Arial',
        }
      },
    };
  }

  loadColumnChartAir() {
    this.umidadeAr = {
      chartType: 'LineChart',
      dataTable: [
        ['Horario', 'Valores em tempo real de luminosidade', 'Valor ideal'],
        [String(this.chartUmidadeArPeriodica[0]),this.chartUmidadeArPeriodica[1],this.chartUmidadeArPeriodica[2]],
      ],
      options: {
        series: {
          0: { color: '#e2431e' },
          1: { color: '#11d92c' }
        },
        legend: { position: 'none' },
        title: 'Sensor de umidade do ar',
        hAxis: {
          title: 'Horário',
        },
        vAxis: {
          title: 'Valor',
          minValue: 0,
          maxValue: 100
        }
      },
    };
  }

  loadColumnChartSoil() {
    this.umidadeSolo = {
      chartType: 'LineChart',
      dataTable: [
        ['Horario', 'Valores em tempo real de umidade do solo', 'Valor ideal'],
        [String(this.chartUmidadeSoloPeriodica[0]),this.chartUmidadeSoloPeriodica[1],this.chartUmidadeSoloPeriodica[2]],
      ],
      options: {
        series: {
          0: { color: '#e2431e' },
          1: { color: '#11d92c' }
        },
        legend: { position: 'none' },
        title: 'Sensor de umidade do solo',
        hAxis: {
          title: 'Horário',
        },
        vAxis: {
          title: 'Valor',
          minValue: 0,
          maxValue: 100
        }
      },
    };
  }
}

