import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../../interface/employee';
import { EmployeeService } from '../../services/employee.service';
import { GeolocationService } from '../../services/geolocation.service';
import { MapComponent } from "../../components/map/map.component"
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  ngOnInit(): void {
    this.getEmployee();
  }

  public employees: Employee[] = [];

  private employeeActual?: Employee = undefined;

  constructor(
    private employeeService: EmployeeService,
    private geolocationService: GeolocationService,
  ) {}

  public setEmployee(employee: Employee) {
    this.employeeActual = employee;
  }

  // Feature Search
  public searchEmployee(form: string): void {
    const employeesFilter: Employee[] = [];

    let str: string = form;
    for (let i = 0; i < this.employees?.length; i++) {
      let dataValues: string[] = Object.values(this.employees[i]); // Arreglo con los values
      dataValues = dataValues.slice(0, 4).concat(dataValues.slice(5)); // Elimino la url

      const txt: string = dataValues.join()?.toLocaleLowerCase(); // Texto final con el que hago la busqueda match

      if (txt.match(str?.toLocaleLowerCase())) {
        employeesFilter.push(this.employees[i]);
      }
    }

    this.employees = employeesFilter;

    if (!str || str === '') {
      this.getEmployee();
    }

    if (employeesFilter?.length == 0) {
      // reemplazar por modal
      alert('No se encuentra ninguna coincidencia');
      this.getEmployee();
    }

    // Reemplazar por una Promesa
    setTimeout(() => this.geolocationService.addMarkers(this.employees), 500)

    
  }

  // ----------------------------------------------------------------- Inicio CRUD -----------------------------------------------------------------
  // Create
  public addNewEmployee(addForm: NgForm): void {
    let employeeToAdd: Employee = addForm.value;

    console.log(employeeToAdd);

    document.getElementById('btn-closeAddModal')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(`Error en addEmployee: ${error.message}`);
      }
    );
    addForm.resetForm();
  }

  // Read
  public getEmployee(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  // Upload
  public uploadEmployee(uploadForm: NgForm): void {
    document.getElementById('btn-closeUploadModal')?.click();

    let employeeToUpload: Employee = uploadForm.value;

    employeeToUpload.id = this.employeeActual!.id;

    this.employeeService.updateEmployee(employeeToUpload).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(`Error en uploadEmployee: ${error.message}`);
      }
    );
    uploadForm.resetForm();
  }

  // Delete
  public deleteEmployee(): void {
    document.getElementById('btn-deleteAddModal')?.click();

    this.employeeService.deleteEmployee(this.employeeActual!.id).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployee();
      },
      (error: HttpErrorResponse) => {
        alert(`Error en deleteEmployee: ${error.message}`);
      }
    );
  }
  // ----------------------------------------------------------------- Fin CRUD -----------------------------------------------------------------
}
