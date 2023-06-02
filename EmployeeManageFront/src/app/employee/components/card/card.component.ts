import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../interface/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public employeesList: Employee[] = []; 

  @Output()
  onAdd: EventEmitter<NgForm> = new EventEmitter();
  
  addNewEmployee(form: NgForm){
    this.onAdd.emit(form)
  }

  @Output()
  onDelete: EventEmitter<Employee> = new EventEmitter();
  
  setEmployee(employee: Employee) :void{
    this.onDelete.emit(employee);
  }

  @Output()
  onDeleteModal: EventEmitter<void> = new EventEmitter();

  deleteEmployee(): void{
    this.onDeleteModal.emit();
  }

  @Output()
  onUpdateModal: EventEmitter<NgForm> = new EventEmitter();

  uploadEmployee(form: NgForm){
    this.onUpdateModal.emit(form);
  }

  

}
