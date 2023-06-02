import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient){}

  public getEmployees(): Observable<Employee[]>{
    const allEmployees = this.http.get<Employee[]>(`${this.apiServerUrl}/api/employees`)
    return allEmployees;
  }

  public addEmployee(employee: Employee): Observable<Employee>{

    if(employee.job === "") employee.job = "UNDEFINED"; 

    return this.http.post<Employee>(`${this.apiServerUrl}/api/employee`, employee)
  }

  public updateEmployee(employee: Employee): Observable<Employee>{

    if(employee.job === "") employee.job = "UNDEFINED"; 
    
    return this.http.put<Employee>(`${this.apiServerUrl}/api/employee/${employee.id}`, employee)
  }

  public deleteEmployee(employeeId: number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiServerUrl}/api/employee/${employeeId}`)
  }


}
