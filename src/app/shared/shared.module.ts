
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent,
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    LoadingSpinnerComponent,
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SearchBoxComponent,
    SidebarComponent,

  ]
})
export class SharedModule { }
