import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CallerService {

  constructor(private http: HttpClient) {
  }

  getProperties(loc, api_key) {
    return this.http.get('http://index1.homeflow.co.uk/properties?api_key=' + api_key + '&search' +
    '[place][id]=' + loc + '&[search][channel]=sales');
  }

  search_word(term, api_key) {
    return this.http.get('http://index1.homeflow.co.uk/places?api_key=' + api_key + '&search[name]=' + term);
    }
}
