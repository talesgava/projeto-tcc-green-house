import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { reject } from 'q';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss'],
})
export class TemperaturaComponent implements OnInit {
  token: any;
  temperatura: any;
  temperaturadaily: any;
  temperaturaweekly: any;
  somadia = 0;
  soma = 0;
  temperaturaDiario = [];
  chartTemperatura4registros = [];
  contador = 1;
  public temperaturaChart: GoogleChartInterface;
  constructor(private apiService: ApiService, ) {

  }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.apiService.present();
    await this.getDataThingTemperatura();
    this.loadColumnChartTemperature();
    await this.getDataThingTemperaturaDiario();
    await this.getDataThingTemperatura5dias();
    this.apiService.dismiss();
  }

  getDataThingTemperaturaDiario() {
    return new Promise((resolve, reject) => {
      this.apiService.getTemperaturaBucket("36").subscribe(
        response => {
          this.temperaturadaily = response;
          for (let result of this.temperaturadaily) {
            this.somadia += (+result.val);
          };
          this.somadia = Math.floor(this.somadia / 36);
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  }

  getDataThingTemperatura5dias() {
    return new Promise((resolve, reject) => {
      this.apiService.getTemperaturaBucket("180").subscribe(
        response => {
          this.temperaturaweekly = response;
          for (let result of this.temperaturaweekly) {
            this.soma += (+result.val);
          };
          this.soma = Math.floor(this.soma / 180);
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  }

  getDataThingTemperatura() {
    return new Promise((resolve, reject) => {
      this.apiService.getTemperaturaBucket("4").subscribe(
        response => {
          this.temperatura = response;
          this.chartTemperatura4registros.push(['Horario', 'Temperatura', 'Valor ideal']);
          for (let result of this.temperatura) {
            this.contador = this.contador + 1;
            result.ts = new Date(result.ts)
            this.chartTemperatura4registros.push([result.ts, +result.val, 62]);
          };
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  };


  loadColumnChartTemperature() {
    this.temperaturaChart = {
      chartType: 'LineChart',
      dataTable: this.chartTemperatura4registros,
      options: {
        legend: { position: 'none' },
        series: {
          0: { color: '#bd3e35' },
          1: { color: '#31b554' },
        },
        title: 'Últimos 4 registros armazenados.',
        hAxis: {
          direction: 1,
          showEveryText: 4,
          title: 'Horário',
          fontName: 'Arial',
        },
        vAxis: {
          minValue: 0,
          maxValue: 35,
          title: 'Valor',
          fontName: 'Arial',
        }
      },
    };
  }

}
