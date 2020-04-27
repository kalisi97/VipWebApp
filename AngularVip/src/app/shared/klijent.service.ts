import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(public http:HttpClient) { }


  getKlijenti(){
return this.http.get(environment.apiUrl+'/Klijent').toPromise();
  }

}
