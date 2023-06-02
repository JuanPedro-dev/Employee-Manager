package com.Trionfini.EmployeeManager.controller;

import com.Trionfini.EmployeeManager.exception.UserNotFoundException;
import com.Trionfini.EmployeeManager.model.Employee;
import com.Trionfini.EmployeeManager.service.EmployeeService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee employeeSaved = employeeService.saveEmployee(employee);
        return new ResponseEntity<>(employeeSaved, HttpStatus.CREATED);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAll(){
        List<Employee> employees= employeeService.getAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id){
        Employee employee= employeeService.getById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> uploadEmployee(@RequestBody Employee employeeToUpdate, @PathVariable Long id){
        employeeService.update(employeeToUpdate, id);
        return ResponseEntity.ok(employeeToUpdate);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        employeeService.delete(id);
        return ResponseEntity.ok(employee);
    }

}
