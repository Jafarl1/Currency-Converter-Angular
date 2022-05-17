import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.css'],
})

export class ActualComponent implements OnInit {

  UsdUah = '1';
  EurUah = '1';

  currentDate = new Date();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    fetch(
      'https://api.exchangerate.host/latest?base=EUR'
    )
      .then((blob) => blob.json())
      .then((res) => {
        let rates = res.rates;
        this.EurUah = rates.UAH.toFixed(2);
        this.UsdUah = ((1 / rates.USD) * rates.UAH).toFixed(2);
      });
  }

}
