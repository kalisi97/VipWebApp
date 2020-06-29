import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StavkaPonuda } from 'src/app/shared/stavka-ponuda.model';
import { UredjajService } from 'src/app/shared/uredjaj.service';
import { Uredjaj } from 'src/app/shared/uredjaj.model';
import { TarifniPaketService } from 'src/app/shared/tarifni-paket.service';
import { TarifniPaket } from 'src/app/shared/tarifni-paket.model';
import { NgForm } from '@angular/forms';
import { PonudaService } from 'src/app/shared/ponuda.service';
import { StavkaPonudaService } from 'src/app/shared/stavka-ponuda.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stavke-ponude',
  templateUrl: './stavke-ponude.component.html',
  styleUrls: []
})
export class StavkePonudeComponent implements OnInit {
  formData: StavkaPonuda;
  listaUredjaja: Uredjaj[];
  listaTarifa: TarifniPaket[];
  isValid: boolean = true;
  postoji: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<StavkePonudeComponent>,
  public uredjajService: UredjajService,
  public toastr: ToastrService,
  public tarifaService: TarifniPaketService,
  public ponudaService: PonudaService) { }


 
  ngOnInit(): void {


  this.uredjajService.getUredjaj().then(res=> this.listaUredjaja = res as Uredjaj[]);
  this.tarifaService.getTarifniPaket().then(res=> this.listaTarifa = res as TarifniPaket[]);

if(this.data.stavkePonudeIndex == null){
    this.formData = {
     
      Rbr : null,
      IDPonude : null,
      IDUredjaja : 0,
      IDTP : 0,
      Naziv: "",
      NazivT : ""
  
    }}else{
      this.formData = Object.assign({}, this.ponudaService.stavkePonude[this.data.stavkePonudeIndex]);
    }
  
  }
 popuniPolja(ctrl) {
    if (ctrl.selectedIndex == 0) {
      
      this.formData.Naziv = "";
  
    }
    else {
      
      this.formData.Naziv = this.listaUredjaja[ctrl.selectedIndex - 1].Naziv;
    
    }
  }

  popuniSve(ctrl){
    if (ctrl.selectedIndex == 0) {
     
      this.formData.NazivT = '';
    }else{
     
     
      
    this.formData.NazivT = this.listaTarifa[ctrl.selectedIndex - 1].NazivT;
    }
  }
  onSubmit(form:NgForm){
    if (this.validateForm(form.value)) {
      if(this.data.stavkePonudeIndex==null){
        if(this.exist(form) == false){
this.ponudaService.stavkePonude.push(form.value);
       }else{
          this.toastr.warning("Već ste uneli ovu stavku!");
        }
        
      }
else this.ponudaService.stavkePonude[this.data.stavkePonudeIndex] = form.value;
this.dialogRef.close();
    }
  }

  validateForm(formData: StavkaPonuda) {
    this.isValid = true;
    if (formData.IDUredjaja == 0)
      this.isValid = false;
      if (formData.IDTP == 0)
      this.isValid = false;
    return this.isValid;
  }

  
  exist(form:NgForm){
       
    for(let i = 0; i < this.ponudaService.stavkePonude.length; i++){
     if(this.ponudaService.stavkePonude[i].Naziv == form.value.Naziv &&
       this.ponudaService.stavkePonude[i].NazivT == form.value.NazivT){
           this.postoji = true; break;
       }
   }
return this.postoji;
 }
 

}
