import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable , of, tap } from 'rxjs';
//import {  tap } from 'rxjs/operators';

import { Country } from '../interfaces/country';
import { SearchBoxComponent } from '../../shared/component/search-box/search-box.component';
import { CacheStore, RegionCountries } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';



@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl: string ='https://restcountries.com/v3.1'

  // para mantener lainformacion
  public cacheStore: CacheStore ={
    byCapital:    {term:'', countries: []},
    byCountries:  {term:'', countries: []},
    byRegion:     {region:'', countries: []},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  //local storage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStorage')) return;

    this.cacheStore= JSON.parse(localStorage.getItem('cacheStorage')!);

  }
// fin local Storage

  private getCountriesRequest ( url: string): Observable<Country[]>
  {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of ([])),
     // delay(2000),
    );
  }


  SearchCountryByAlphaCode( code: string): Observable<Country | null>
  {
    const url = `${this.apiUrl}/alpha/${ code }`;

    return this.http.get <Country[]>( url )
     .pipe(
          map( countries => countries.length > 0 ? countries[0] : null),
            catchError( () =>  of(null)) // aqui no usamos el error
     );
  }

  searchCapital( term: string) : Observable <Country []>{
    const url = `${this.apiUrl}/capital/${ term }`
     return this.getCountriesRequest(url)
     .pipe(
      tap( countries => this.cacheStore.byCapital ={  term,  countries}),  // puede ir term: term, countries: countries .
      tap ( () => this.saveToLocalStorage())                             // en versiones actuales de rkjs se deja solo el nombre por el objeto apunta al mismo nombre.
    );
    // .pipe(
            // catchError( error =>  of([]))  // regresa un arreglo vacio
            catchError( () =>  of([])) // aqui no usamos el error


        //tap( countries => console.log('paso por el tap' ,countries)),
        //map (countries => [] ),       //transforma la info en tap 2 no se ve
        //tap( countries => console.log('paso por el tap2' ,countries)),
    // );

  }

  searchByCountry( term: string) : Observable <Country []>{

    const url = `${this.apiUrl}/name/${ term }`
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries ={  term,  countries}),
      tap ( () => this.saveToLocalStorage())
    );

  }

  searchByRegion( region: Region) : Observable <Country []>{

    const url = `${this.apiUrl}/region/${ region }`
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion ={  region,  countries}),
      tap ( () => this.saveToLocalStorage())
    );

  }

}
