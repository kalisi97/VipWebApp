import { Component, OnInit } from '@angular/core';
import { UredjajService } from 'src/app/shared/uredjaj.service';
import { ProizvodjacService } from 'src/app/shared/proizvodjac.service';
import { Proizvodjac } from 'src/app/shared/proizvodjac.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { isNumber } from 'util';
import { empty } from 'rxjs';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-uredjaj',
  templateUrl: './uredjaj.component.html',
  styleUrls: []
})
export class UredjajComponent implements OnInit {

  listaProizvodjaca: Proizvodjac[];
  isValid: boolean=true;
  jesteBroj: boolean=true;
  constructor(public dialog: MatDialog,public service: UredjajService,
    public serviceProizvodjac: ProizvodjacService,
    public toastr: ToastrService,
    public router:Router,
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

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateUredjaj().subscribe(res => {
        this.resetForm();
        this.toastr.success("Podaci usepšno sačuvani!","Unos uredjaja");
        this.router.navigate(['uredjaji']);
      })
    }
  
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.IDUredjaja == 0)
      this.isValid = false;
      if (this.service.formData.IDProizvodjaca == 0)
      this.isValid = false;
      if(this.service.formData.Cena == "" || this.service.formData.Boja==""
      || this.service.formData.Model == "" || this.service.formData.Naziv=="") this.isValid=false;
     if(this.proveriBroj() == false) this.isValid=false;
    return this.isValid;
  }

  proveriBroj(){
   this.jesteBroj=true;
    if(!Number(this.service.formData.Cena)) this.jesteBroj = false;
    return this.jesteBroj;
  }

}
