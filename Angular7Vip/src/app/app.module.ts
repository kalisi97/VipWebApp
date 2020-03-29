import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PonudeComponent } from './ponude/ponude.component';
import { PonudaComponent } from './ponude/ponuda/ponuda.component';
import { StavkePonudeComponent } from './ponude/stavke-ponude/stavke-ponude.component';
import { PonudaService } from './shared/ponuda.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UredjajComponent } from './uredjaji/uredjaj/uredjaj.component';
import { UredjajiComponent } from './uredjaji/uredjaji.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PonudeComponent,
    PonudaComponent,
    StavkePonudeComponent,
    UredjajComponent,
    UredjajiComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[StavkePonudeComponent],
  providers: [PonudaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
