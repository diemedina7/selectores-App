import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor( private http: HttpClient) { }

  get regions(): Region[] {
    return structuredClone(this._regions);
  }

  public getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if (!region)  return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      map( countries => countries.map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []      //operador coalescente nulo -> si es nulo entonces el valor es: []
      }) ) )
    )}
}
