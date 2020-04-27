import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarifniPaketService {

  constructor(public http:HttpClient) { }


  getTarifniPaket(){
return this.http.get(environment.apiUrl+'/TarifniPaket').toPromise();
  }
}
