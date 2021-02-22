import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { reject } from 'q';
@Component({
  selector: 'app-luminosidade',
  templateUrl: './luminosidade.component.html',
  styleUrls: ['./luminosidade.component.scss'],
})
export class LuminosidadeComponent implements OnInit {
  temperatura: any;
  luminosidadeDaily: any;

  somadia = 0;
  soma = 0;

  luminosidadeDiario = [];
  chartLuminosidade4registros = [];
  contador = 1;
  public luminosidadeChart: GoogleChartInterface;
  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.apiService.present();
    await this.getDataThingLuminosidade();
    this.loadColumnChartLuminosidade();
    await this.getDataThingLuminosidadeDiario();
    await this.getDataThingLuminosidade5dias();
    this.apiService.dismiss();
  }

  getDataThingLuminosidadeDiario() {
    return new Promise((resolve, reject) => {
      this.apiService.getLuminosidadeBucket("36").subscribe(
        response => {
          this.luminosidadeDaily = response;
          for (let result of this.luminosidadeDaily) {
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

  getDataThingLuminosidade5dias() {
    return new Promise((resolve, reject) => {
      this.apiService.getLuminosidadeBucket("180").subscribe(
        response => {
          this.luminosidadeDaily = response;
          for (let result of this.luminosidadeDaily) {
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

  getDataThingLuminosidade() {
    return new Promise((resolve, reject) => {
      this.apiService.getLuminosidadeBucket("4").subscribe(
        response => {
          this.temperatura = response;
          this.chartLuminosidade4registros.push(['horario', 'luminosidade', 'valor ideal']);
          for (let result of this.temperatura) {
            this.contador = this.contador + 1;
            result.ts = new Date(result.ts)
            this.chartLuminosidade4registros.push([result.ts, +result.val, 30]);
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


  loadColumnChartLuminosidade() {
    this.luminosidadeChart = {
      chartType: 'LineChart',
      dataTable: this.chartLuminosidade4registros,
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
