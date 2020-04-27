import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../shared/ponuda.service';
import { Ponuda } from '../shared/ponuda.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: []
})
export class PonudeComponent implements OnInit {
  listaPonuda;
term;
  constructor(public ponudaService:PonudaService, private router: Router,
    private toastr: ToastrService,
  
    ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openForEdit(ponudaId: number){
    this.router.navigate(['/ponuda/edit/' + ponudaId]);
  }

  refreshList() {
    this.ponudaService.getPonude().then(res => this.listaPonuda = res);
   
  
   
  }
  onPonudaDelete(id: number) {
    if (confirm('Da li ste sigurni da zelite da obrisete podatke o ponudi?')) {
      this.ponudaService.deletePonuda(id).then(res => {
       this.refreshList();
        this.toastr.warning("Uspesno obrisano", "Unos ponude");
      });
    }
  }




}
