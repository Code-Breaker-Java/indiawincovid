import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronaServiceService {

  constructor(private http: HttpClient ) { }

    getcases_time_series() {
      return this.http.get('https://api.covid19india.org/data.json');
    }
  
    getdistrict_wise() {
      return this.http.get('https://api.covid19india.org/state_district_wise.json');
    }
  
    gettravel_history() {
      return this.http.get('https://api.covid19india.org/travel_history.json');
    }
  
    getraw_data() {
      return this.http.get('https://api.covid19india.org/raw_data.json');
    }
  
}
