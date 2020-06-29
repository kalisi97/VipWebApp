import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PonudeComponent } from './ponude/ponude.component';
import { PonudaComponent } from './ponude/ponuda/ponuda.component';
import { UredjajComponent } from './uredjaji/uredjaj/uredjaj.component';
import { UredjajiComponent } from './uredjaji/uredjaji.component';
import {InternalServerComponent} from './error-pages/internal-server/internal-server.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {NoContentComponent} from './error-pages/no-content/no-content.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'ponude',component:PonudeComponent},
  {path:'ponuda', children:[
   {path:'', component:PonudaComponent},
   {path:'edit/:id', component:PonudaComponent}
  ]},
  { path: '404', component: NotFoundComponent},
      { path: '500', component: InternalServerComponent },
      { path: '204', component: NoContentComponent },
  {path:'uredjaji',component:UredjajiComponent},
  {path:'uredjaj', children:[
    {path:'', component:UredjajComponent},
    {path:'edit/:id', component:UredjajComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
