import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-umidade-solo',
  templateUrl: './umidade-solo.component.html',
  styleUrls: ['./umidade-solo.component.scss'],
})
export class UmidadeSoloComponent implements OnInit {
  solo: any;
  soloDaily: any;

  soma = 0;
  somadiario = 0;

  soloDiario = [];
  chartSolo4registros = [];
  public soloChart: GoogleChartInterface;
  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.apiService.present();
    await this.getDataThingSolo();
    this.loadColumnChartSolo();
    await this.getDataThingSoloDiario();
    await this.getDataThingSolo5dias();
    this.apiService.dismiss();
  }

  getDataThingSoloDiario() {
    return new Promise((resolve, reject) => {
      this.apiService.getSoloBucket("36").subscribe(
        response => {
          this.soloDaily = response;
          for (let result of this.soloDaily) {
            this.somadiario += (+result.val);
          };
          this.somadiario = Math.floor(this.somadiario / 36);
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  }

  getDataThingSolo5dias() {
    return new Promise((resolve, reject) => {
      this.apiService.getSoloBucket("180").subscribe(
        response => {
          this.soloDaily = response;
          for (let result of this.soloDaily) {
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

  getDataThingSolo() {
    return new Promise((resolve, reject) => {
      this.apiService.getSoloBucket("4").subscribe(
        response => {
          this.solo = response;
          this.chartSolo4registros.push(['horario', 'solo', 'valor ideal']);
          for (let result of this.solo) {
            result.ts = new Date(result.ts)
            this.chartSolo4registros.push([result.ts, +result.val, 30]);
          };
          console.log(this.chartSolo4registros)
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  };


  loadColumnChartSolo() {
    this.soloChart = {
      chartType: 'LineChart',
      dataTable: this.chartSolo4registros,
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
