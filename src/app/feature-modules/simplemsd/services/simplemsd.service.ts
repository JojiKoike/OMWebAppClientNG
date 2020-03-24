import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InitUIValuesModel, SimpleMSDInputModel,  SimpleMSDOutputModel} from '../core/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimpleMSDService {

private readonly baseUrl = `${environment.host}`;

constructor(private http: HttpClient) { }

getDefaultInput() {
  const url = `${this.baseUrl}/simplemsd`;
  return this.http.get<InitUIValuesModel>(url);
}

runSimulation(input: SimpleMSDInputModel) {
  const url = `${this.baseUrl}/simplemsd`;
  return this.http.post<SimpleMSDOutputModel>(url, input);
}

}
