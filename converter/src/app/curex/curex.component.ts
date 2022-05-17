import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curex',
  templateUrl: './curex.component.html',
  styleUrls: ['./curex.component.css'],
})
export class CurexComponent implements OnInit {
  allRates = [{ val: 'string', price: 'number' }];
  allKeys = ['Select'];

  currency1 = '';
  currency2 = '';

  inputValue1 = '';
  inputValue2 = '';

  result: number = 1;
  result2: number = 1;

  selected1(value) {
    this.currency1 = value;
  }

  selected2(value) {
    this.currency2 = value;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    fetch('https://api.exchangerate.host/latest?base=EUR')
      .then((blob) => blob.json())
      .then((res) => {
        let rates = res.rates;
        for (let a in res.rates) {
          this.allRates.push({
            val: a,
            price: res.rates[a],
          });
        }

        let keys = Object.keys(rates);
        keys.map((a) => {
          this.allKeys.push(a);
        });
      });
  }

  calculate1(value) {
    let x = value;

    if (this.currency1 && this.currency2) {
      let selectedCurrency = this.allRates.find(
        (a) => a.val === this.currency1
      );
      let selectedCurrency2 = this.allRates.find(
        (a) => a.val === this.currency2
      );

      if (
        selectedCurrency!.val != 'Select' &&
        selectedCurrency2!.val != 'Select'
      ) {
        this.result =
          (x / Number(selectedCurrency!.price)) *
          Number(selectedCurrency2!.price);
      }

      if (this.result > 0) {
        this.inputValue2 = `${this.result}`;
        this.inputValue2 = Number(this.inputValue2).toFixed(2);
      } else {
        this.inputValue2 = '';
      }
    }
  }

  calculate2(value) {
    let x = value;

    if (this.currency1 && this.currency2) {
      let selectedCurrency = this.allRates.find(
        (a) => a.val === this.currency1
      );
      let selectedCurrency2 = this.allRates.find(
        (a) => a.val === this.currency2
      );

      if (
        selectedCurrency!.val != 'Select' &&
        selectedCurrency2!.val != 'Select'
      ) {
        this.result2 =
          (x / Number(selectedCurrency2!.price)) *
          Number(selectedCurrency!.price);
      }

      if (this.result2 > 0) {
        this.inputValue1 = `${this.result2}`;
        this.inputValue1 = Number(this.inputValue1).toFixed(2);
      } else {
        this.inputValue1 = '';
      }
    }
  }
}
