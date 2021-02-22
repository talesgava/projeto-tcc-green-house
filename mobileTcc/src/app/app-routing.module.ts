import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'temperatura',
    loadChildren: () => import('./temperatura/temperatura.module').then(m => m.TemperaturaComponentModule)
  },
  {
    path: 'luminosidade',
    loadChildren: () => import('./luminosidade/luminosidade.module').then(m => m.LuminosidadeComponentModule)
  },
  {
    path: 'umidade-ar',
    loadChildren: () => import('./umidade-ar/umidade-ar.module').then(m => m.UmidadeArComponentModule)
  },
  {
    path: 'umidade-solo',
    loadChildren: () => import('./umidade-solo/umidade-solo.module').then(m => m.UmidadeSoloComponentModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
