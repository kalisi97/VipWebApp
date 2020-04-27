import { Injectable } from '@angular/core';
import { Ponuda } from './ponuda.model';
import { StavkaPonuda } from './stavka-ponuda.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PonudaService {
formData:Ponuda;
stavkePonude:StavkaPonuda[];
constructor(private http: HttpClient) { }

saveOrUpdatePonuda() {
  var body = {
    ...this.formData,
    StavkaPonudes: this.stavkePonude
  };
  return this.http.post(environment.apiUrl + '/Ponuda', body);
}

getPonude(){
  return this.http.get(environment.apiUrl + '/Ponuda').toPromise();
    }

    getPonudaByID(id:number):any {
      return this.http.get(environment.apiUrl + '/Ponuda/'+id).toPromise();
    }

    deletePonuda(id:number){
      return this.http.delete(environment.apiUrl + '/Ponuda/'+id).toPromise();
    }

}
