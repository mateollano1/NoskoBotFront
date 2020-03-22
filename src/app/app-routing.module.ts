import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotControllerComponent } from './components/bot-controller/bot-controller.component';


const routes: Routes = [
  {
    path: 'control',
    component: BotControllerComponent,
    data: { title: 'Heroes List' }
  },
  { path: '**',
    redirectTo: '/control',
    pathMatch: 'full'
  },
  { path: '**', component: BotControllerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
