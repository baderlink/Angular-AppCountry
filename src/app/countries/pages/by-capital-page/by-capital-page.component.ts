
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: []
})

export class ByCapitalPageComponent implements OnInit {  //on Init para mantenr la informacion

  public countries: Country[] =[];
  public isLoading:boolean = false;
  public initialValue: string='';

  constructor(private countriesService: CountriesService){} //mantener la infomracion

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string): void{

    this.isLoading=true;
    this.countriesService.searchCapital(term)
    .subscribe( countries => {
      this.countries=countries;
      this.isLoading= false;
    })
  }

}
