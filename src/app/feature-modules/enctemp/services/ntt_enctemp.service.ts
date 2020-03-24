import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { InitUIValuesModel, NTTEncTempOutputModel } from '../core/models';
import { NTTEncTempInputModel } from '../core/models/ntt.enctemp.input.model';

@Injectable({
  providedIn: 'root'
})
export class NTTEncTempService {

private readonly baseUrl = `${environment.host}`;


constructor(private http: HttpClient) { }

getDefaultInput() {
  const url = `${this.baseUrl}/ntt/airtightenctemp`;
  return this.http.get<InitUIValuesModel>(url);
}

runSimulation(input: NTTEncTempInputModel) {
  const url = `${this.baseUrl}/ntt/airtightenctemp`;
  return this.http.post<NTTEncTempOutputModel>(url, input);
}
}
