import { Component, EventEmitter, Output } from '@angular/core';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter();

  searchEmployee(form: NgForm): void{

    let formStr: string = form.value.str;
    this.onSearch.emit(formStr); 
    form.reset();
  }

}
