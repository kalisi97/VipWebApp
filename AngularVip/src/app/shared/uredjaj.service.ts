import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Uredjaj } from './uredjaj.model';

@Injectable({
  providedIn: 'root'
})
export class UredjajService {
  formData:Uredjaj;

  constructor(public http:HttpClient) { }


  getUredjaj(){
return this.http.get(environment.apiUrl+'/Uredjaj').toPromise();
  }

  getUredjajByFilter(nazivUredjaja:string){
    return this.http.get(environment.apiUrl+'/Uredjaj').toPromise();
      }
      
  getUredjajById(id:number):any{
    return this.http.get(environment.apiUrl+'/Uredjaj/'+id).toPromise();
      }

      saveOrUpdateUredjaj() {
        var body = {
          ...this.formData
         
        };
        return this.http.post(environment.apiUrl + '/Uredjaj', body);
      }

      deleteUredjaj(id:number){
        return this.http.delete(environment.apiUrl + '/Uredjaj/'+id).toPromise();
      }

}
