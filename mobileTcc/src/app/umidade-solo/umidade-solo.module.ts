import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { UmidadeSoloComponent } from './umidade-solo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2GoogleChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UmidadeSoloComponent
      }
    ])
  ],
  declarations: [UmidadeSoloComponent]
})
export class UmidadeSoloComponentModule {}
