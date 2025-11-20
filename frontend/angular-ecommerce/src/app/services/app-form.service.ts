import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppFormService {

  private countriesUrl = environment.apiUrl + '/countries';
  private statesUrl = environment.apiUrl + '/states';

  constructor(private httpClient: HttpClient){
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]>{
    //search URL
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    )
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    // Creates an array from startMonth to 12
    const months = Array.from({ length: 13 - startMonth }, (_, i) => i + startMonth);
    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {
    // Creates an array of 11 years (current year + next 10)
    const startYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => startYear + i);
    return of(years);
  }
  
}


interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
