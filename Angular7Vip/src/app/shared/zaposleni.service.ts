import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZaposleniService {

  constructor(public http:HttpClient) { }


  getZaposleni(){
return this.http.get(environment.apiUrl+'/Zaposleni').toPromise();
  }
}
