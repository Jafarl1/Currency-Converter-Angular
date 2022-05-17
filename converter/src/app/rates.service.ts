import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {}

  getCurrencyData(country1: string){
    let url = 'https://api.exchangerate.host/latest?base=' + country1
    return this.http.get(url)
  }

}
