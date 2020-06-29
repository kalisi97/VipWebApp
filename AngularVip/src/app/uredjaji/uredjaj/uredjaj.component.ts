import { Component, OnInit } from '@angular/core';
import { UredjajService } from 'src/app/shared/uredjaj.service';
import { ProizvodjacService } from 'src/app/shared/proizvodjac.service';
import { Proizvodjac } from 'src/app/shared/proizvodjac.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Uredjaj } from 'src/app/shared/uredjaj.model';

@Component({
  selector: 'app-uredjaj',
  templateUrl: './uredjaj.component.html',
  styleUrls: []
})
export class UredjajComponent implements OnInit {

  listaProizvodjaca: Proizvodjac[];
  isValid: boolean=true;
  jesteBroj: boolean=true;
  postoji:boolean = false;
  listaUredjaja;
  proizvodjac:Proizvodjac;
  constructor(public dialog: MatDialog,public service: UredjajService,
    public serviceProizvodjac: ProizvodjacService,
    public toastr: ToastrService,
    public router:Router,
    public errorHandler: ErrorHandlerService,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    let uredjajId = this.currentRoute.snapshot.paramMap.get('id');
    if(uredjajId == null)
    this.resetForm();
    else { this.service.getUredjajById(parseInt(uredjajId)).then(res => {
      this.service.formData = res.uredjaj;
      
    });
  }
    

    this.serviceProizvodjac.getProizvodjac().then(res => this.listaProizvodjaca = res as Proizvodjac[]);
    this.service.getUredjaj().then(res => this.listaUredjaja = res);
    
  }

  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData={
      IDUredjaja: null,
      Boja: "",
      Cena: "",
      Naziv: "",
      Model: "",
      IDProizvodjaca: 0
    }
    
  }
exist(form: NgForm){
  this.postoji = false;
  for(let i = 0; i < this.listaUredjaja.length; i++){
    this.nadjiProizvodjaca(this.service.formData.IDProizvodjaca);
    if(this.listaUredjaja[i].Model === form.value.Model &&
       this.listaUredjaja[i].Naziv === form.value.Naziv &&
       this.listaUredjaja[i].Boja === form.value.Boja &&
       this.listaUredjaja[i].IDUredjaja != form.value.IDUredjaja && 
       this.proizvodjac.Naziv === this.listaUredjaja[i].Proizvodjac){
         this.postoji = true;
         break;
       }
  }
  return this.postoji;
}


nadjiProizvodjaca(id : number){
  for(let i = 0; i < this.listaProizvodjaca.length; i++){
    if(this.listaProizvodjaca[i].IDProizvodjaca == id) this.proizvodjac = this.listaProizvodjaca[i];
  }
}



  onSubmit(form: NgForm) {
    if (this.validateForm()) {
        if(this.exist(form) == false){
        this.service.saveOrUpdateUredjaj().subscribe(res => {
        this.resetForm();
        this.toastr.success("Podaci uspešno sačuvani!");
        this.router.navigate(['uredjaji']);
      },
      error => {   
        this.errorHandler.handleError(error);
       })
    }else{
   this.toastr.error("Uređaj sa ovim karakteristikama već postoji u bazi!");
    }
    }
  }


 

  validateForm() {
    this.isValid = true;
    if (this.service.formData.IDUredjaja == 0)
      this.isValid = false;
      if (this.service.formData.IDProizvodjaca == 0)
      this.isValid = false;
      else this.nadjiProizvodjaca(this.service.formData.IDProizvodjaca);
      if(this.service.formData.Cena == "" || this.service.formData.Boja==""
      || this.service.formData.Model == "" || this.service.formData.Naziv=="") this.isValid=false;
     if(this.proveriBroj() == false) this.isValid=false;
     if(!this.service.formData.Naziv.toLowerCase().startsWith(this.proizvodjac.Naziv.toLowerCase()))
      {
       this.toastr.error("Proverite izabranog proizvodjaca i naziv telefona!");
       this.isValid = false;
     }
    return this.isValid;
  }

  proveriBroj(){
   this.jesteBroj=true;
    if(!Number(this.service.formData.Cena)) this.jesteBroj = false;
    return this.jesteBroj;
  }

}
