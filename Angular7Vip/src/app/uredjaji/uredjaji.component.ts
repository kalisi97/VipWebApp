import { Component, OnInit } from '@angular/core';
import { UredjajService } from '../shared/uredjaj.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uredjaji',
  templateUrl: './uredjaji.component.html',
  styleUrls: []
})
export class UredjajiComponent implements OnInit {
listaUredjaja;
  constructor(public uredjajService:UredjajService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openForEdit(uredjajId: number){
    this.router.navigate(['/uredjaj/edit/' + uredjajId]);
  }

  refreshList() {
  this.uredjajService.getUredjaj().then(res => this.listaUredjaja = res);
  }

  onUredjajDelete(id: number) {
    if (confirm('Da li ste sigurni da zelite da obrisete podatke o uredjaju?')) {
      this.uredjajService.deleteUredjaj(id).then(res => {
       this.refreshList();
        this.toastr.warning("Uspesno obrisano", "Unos uredjaja");
      });
    }
  }
  
 

}
