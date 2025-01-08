import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.services';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;


  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CountriesService: CountriesService

  ) {}


  ngOnInit(): void {

    this.activatedRoute.params
    .pipe (
        switchMap ( ({ id }) => this.CountriesService.SearchCountryByAlphaCode (id) ),
    ) .subscribe ( country =>{
        if ( !country ) {
          return this.router.navigateByUrl('');

        }
        this.country=country;

        return;
    });
  }



  //observable health  un observable dentro de otro observable  este codigo se refactoriza por el codigo de arriba
 /* ngOnInit() : void{
    this.activatedRoute.params
    .subscribe ( ({id}) => {

      this.CountriesService.SearchCountryByAlphaCode( id )
      .subscribe( country => {
        console.log( {country} )
      });

    });
  }  */


}
