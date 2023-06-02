package com.Trionfini.EmployeeManager.service;

import com.Trionfini.EmployeeManager.exception.UserNotFoundException;
import com.Trionfini.EmployeeManager.model.Employee;
import com.Trionfini.EmployeeManager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee){
        employee.setDateAdmission(LocalDateTime.now());

        if(employee.getImgUrl() == null || employee.getImgUrl().equals("")){
            employee.setImgUrl("../assets/img/usuario.webp");
        }
        return employeeRepository.save(employee);
    }
    public List<Employee> getAll(){
        return employeeRepository.findAll();
    }
    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                    .orElseThrow(()-> new UserNotFoundException("User by id: " + id + " not found"));
    }
    public void update(Employee employeeToUpdate, Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("User by id: " + id + " not found"));
        employeeToUpdate.setId(id);
        employeeToUpdate.setDateAdmission(employee.getDateAdmission());

        if(employeeToUpdate.getImgUrl() == null || employeeToUpdate.getImgUrl().equals("")){
            employeeToUpdate.setImgUrl("../assets/img/usuario.webp");
        }

        employeeRepository.save(employeeToUpdate);
    }
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }


}
