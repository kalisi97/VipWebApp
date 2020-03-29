import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StavkaPonudaService {

  constructor(public http:HttpClient) { }


  getStavke(){

    return this.http.get(environment.apiUrl+'/Stavke').toPromise();
}
}
