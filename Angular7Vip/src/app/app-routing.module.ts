import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PonudeComponent } from './ponude/ponude.component';
import { PonudaComponent } from './ponude/ponuda/ponuda.component';
import { UredjajComponent } from './uredjaji/uredjaj/uredjaj.component';
import { UredjajiComponent } from './uredjaji/uredjaji.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'ponude',component:PonudeComponent},
  {path:'ponuda', children:[
   {path:'', component:PonudaComponent},
   {path:'edit/:id', component:PonudaComponent}
  ]},
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
