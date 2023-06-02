import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';



@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
    ],
    exports: [
        MainPageComponent,
        NavbarComponent,
        CardComponent
    ],
    declarations: [
        MainPageComponent,
        NavbarComponent,
        CardComponent,
        MapComponent
  ],
    providers: [],
})
export class EmployeeModule { }
