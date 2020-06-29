import { Component, OnInit } from '@angular/core';
import { UredjajService } from '../shared/uredjaj.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
@Component({
  selector: 'app-uredjaji',
  templateUrl: './uredjaji.component.html',
  styleUrls: []
})
export class UredjajiComponent implements OnInit {
listaUredjaja;
term: string;
  constructor(public uredjajService:UredjajService,
    private router: Router,
    public errorHandler: ErrorHandlerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openForEdit(uredjajId: number){
    this.router.navigate(['/uredjaj/edit/' + uredjajId]).catch(
      (error) => {
                this.errorHandler.handleError(error);
               
      }
    ); ;
  }

  refreshList() {
  this.uredjajService.getUredjaj().then(res => this.listaUredjaja = res).catch(
    (error) => {
              this.errorHandler.handleError(error);
             
    }
  );
  }

  onUredjajDelete(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete podatke o uređaju?')) {
      this.uredjajService.deleteUredjaj(id).then(res => {
       this.refreshList();
        this.toastr.warning("Uspešno obrisan uređaj!");
      },
      error => {
    
        this.errorHandler.handleError(error);
               
      }
      );
    }
  }
  


}
