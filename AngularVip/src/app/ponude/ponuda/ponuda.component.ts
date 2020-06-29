    
import { Component, OnInit } from '@angular/core';
import { PonudaService } from 'src/app/shared/ponuda.service';
import { NgForm, FormControl } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { StavkePonudeComponent } from '../stavke-ponude/stavke-ponude.component';
import { ZaposleniService } from 'src/app/shared/zaposleni.service';
import { Zaposleni } from 'src/app/shared/zaposleni.model';
import { Klijent } from 'src/app/shared/klijent.model';
import { KlijentService } from 'src/app/shared/klijent.service';
import { StavkaPonudaService } from 'src/app/shared/stavka-ponuda.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { getLocaleDateTimeFormat } from '@angular/common';
@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: []
})
export class PonudaComponent implements OnInit {
  
listaZaposlenih : Zaposleni[];
listaKlijenata : Klijent[];
isValid: boolean=true;




  constructor(public service: PonudaService,public dialog: MatDialog,
    public zaposleniService: ZaposleniService,
    public klijentService: KlijentService,
    public stavkaService: StavkaPonudaService,
    public toastr: ToastrService,
    public router:Router,
    public errorHandler: ErrorHandlerService,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let ponudaId = this.currentRoute.snapshot.paramMap.get('id');
    if(ponudaId == null)
    this.resetForm();
    else { this.service.getPonudaByID(parseInt(ponudaId)).then(res => {
      this.service.formData = res.ponuda;
      this.service.formData.Datum = res.ponuda.Datum;
      this.service.stavkePonude = res.ponudaDetails;
     
    });
  }
    this.klijentService.getKlijenti().then(res=> this.listaKlijenata = res as Klijent[]);
    this.zaposleniService.getZaposleni().then(res=>this.listaZaposlenih = res as Zaposleni[]);
   
    
  }
  

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.service.formData.Datum = event.value;
   
  }


  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData={
      IDPonude: null,
      Datum: null,
      IDZap: 0,
      IDKlijenta: 0,
      DeletedStavkeIDs: ''
     
    }
    this.service.stavkePonude=[];
  
  }

  onDeleteStavka(rbr:number,i:number){
    if (rbr != null)
    this.service.formData.DeletedStavkeIDs += rbr + ",";
    this.service.stavkePonude.splice(i,1);

    }

AddOrEditStavka(stavkePonudeIndex, IDPonude){
  
  const dialogConfing = new MatDialogConfig();
  dialogConfing.autoFocus = true;
  dialogConfing.disableClose = true;
  dialogConfing.width="50%";
  dialogConfing.data = {stavkePonudeIndex, IDPonude};
  this.dialog.open(StavkePonudeComponent,dialogConfing);
}

onSubmit(form: NgForm) {
  if (this.validateForm()) {
    this.service.saveOrUpdatePonuda().subscribe(res => {
      this.resetForm();
      this.toastr.success("Podaci uspešno sačuvani!");
      this.router.navigate(['ponude']);
    },
    
    error => {
      this.errorHandler.handleError(error);
            
    }
    )
  }

}

validateForm() {
  this.isValid = true;
if(this.service.formData.Datum == null) this.isValid = false;
  if (this.service.formData.IDKlijenta == 0)
    this.isValid = false;
    if (this.service.formData.IDZap == 0)
    this.isValid = false;
  else if (this.service.stavkePonude.length == 0)
    this.isValid = false;
   
  return this.isValid;
}


}
