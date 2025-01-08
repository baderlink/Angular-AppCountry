import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable , of } from 'rxjs';
//import {  tap } from 'rxjs/operators';

import { Country } from '../interfaces/country';
import { SearchBoxComponent } from '../../shared/component/search-box/search-box.component';



@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl: string ='https://restcountries.com/v3.1'


  constructor(private http: HttpClient) { }


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

     return this.http.get <Country[]>( url )
     .pipe(
            // catchError( error =>  of([]))  // regresa un arreglo vacio
            catchError( () =>  of([])) // aqui no usamos el error


        //tap( countries => console.log('paso por el tap' ,countries)),
        //map (countries => [] ),       //transforma la info en tap 2 no se ve
        //tap( countries => console.log('paso por el tap2' ,countries)),
     );

  }

  searchByCountry( term: string) : Observable <Country []>{

    const url = `${this.apiUrl}/name/${ term }`
    return this.http.get <Country[]>( url )
    .pipe(
           catchError( () =>  of([])) // aqui no usamos el error
    );
  }

  searchByRegion( term: string) : Observable <Country []>{

    const url = `${this.apiUrl}/region/${ term }`
    return this.http.get <Country[]>( url )
    .pipe(
           catchError( () =>  of([])) // aqui no usamos el error
    );

  }

}
