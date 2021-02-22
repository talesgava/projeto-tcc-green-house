import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-umidade-ar',
  templateUrl: './umidade-ar.component.html',
  styleUrls: ['./umidade-ar.component.scss'],
})
export class UmidadeArComponent implements OnInit {
  umidadeArDaily: any;
  umidade: any;
  somadia = 0;
  soma = 0;

  umidadeArDiario = [];
  chartUmidadeAr4registros = [];
  contador = 1;
  public umidadeArChart: GoogleChartInterface;
  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.apiService.present();
    await this.getDataThingUmidadeAr();
    this.loadColumnChartUmidadeAr();
    await this.getDataThingUmidadeArDiario();
    await this.getDataThingUmidade5dias();
    this.apiService.dismiss();
  }

  getDataThingUmidadeArDiario() {
    return new Promise((resolve, reject) => {
      this.apiService.getUmidadeArBucket("36").subscribe(
        response => {
          this.umidadeArDaily = response;
          for (let result of this.umidadeArDaily) {
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

  getDataThingUmidade5dias() {
    return new Promise((resolve, reject) => {
      this.apiService.getUmidadeArBucket("180").subscribe(
        response => {
          this.umidadeArDaily = response;
          for (let result of this.umidadeArDaily) {
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

  getDataThingUmidadeAr() {
    return new Promise((resolve, reject) => {
      this.apiService.getUmidadeArBucket("4").subscribe(
        response => {
          this.umidade = response;
          this.chartUmidadeAr4registros.push(['Horario', 'Umidade do Ar', 'valor ideal']);
          for (let result of this.umidade) {
            this.contador = this.contador + 1;
            result.ts = new Date(result.ts)
            this.chartUmidadeAr4registros.push([result.ts, +result.val, 30]);
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


  loadColumnChartUmidadeAr() {
    this.umidadeArChart = {
      chartType: 'LineChart',
      dataTable: this.chartUmidadeAr4registros,
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
