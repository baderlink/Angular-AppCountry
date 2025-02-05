import { Component, EventEmitter, Input,  OnDestroy,  OnInit,  Output, } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles:[]
})
export class SearchBoxComponent implements OnInit , OnDestroy{

  private debouncer: Subject<string>= new Subject<string>();  // Subject observable manual
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder:string  ='';


  @Input ()
  public InitialValue: string=''

  @Output()
  public onValue = new EventEmitter<string>();


  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSuscription= this.debouncer
    .pipe(debounceTime(300)
    )       //espera 1 segundo para pasar al subscribe
    .subscribe( value => {
       this.onDebounce.emit(value);
    }

    )
  }
  ngOnDestroy(): void {
  this.debouncerSuscription?.unsubscribe(); // eliminar la suscripcion
  }


  emitValue(value: string): void{
    this.onValue.emit(value);
  }

   onKeyPress(searchTerm: string)  {
      this.debouncer.next(searchTerm)
      }


}
