import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

public countries: Country[]=[];

constructor (private CountriesService: CountriesService ){}

searchByCountry( term: string): void {
  this.CountriesService.searchByCountry(term)
  .subscribe(countries => {
    this.countries=countries;
  } )
}

}
