package com.Trionfini.EmployeeManager.utils;

import com.Trionfini.EmployeeManager.model.Employee;
import com.Trionfini.EmployeeManager.model.Geolocation;
import com.Trionfini.EmployeeManager.model.TypeCategory;
import com.Trionfini.EmployeeManager.repository.EmployeeRepository;
import com.Trionfini.EmployeeManager.service.EmployeeService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ETLEmployee {
    public void writeOnFile(){
        // Escribir en archivo:
        File file = new File("src/main/java/com/Trionfini/EmployeeManager/utils/fileEmployees.json");

        ObjectMapper mapper = new ObjectMapper();

        List<Employee> employees = new ArrayList<>(Arrays.asList(
                new Employee(
                        1L,
                        "Nahuel",
                        "Gonzales",
                        TypeCategory.ELECTRICIAN,
                        "https://bootdey.com/img/Content/avatar/avatar1.png",
                        new Geolocation(-37.99186,-57.55721, "25 de Mayo, 1550")
//                        LocalDateTime.of(2021,01,1,8,0)
                ),
                new Employee(
                        2L,
                        "Juan Pedro",
                        "Trionfini",
                        TypeCategory.IT,
                        "https://bootdey.com/img/Content/avatar/avatar2.png",
                        new Geolocation(-37.98932,-57.55177, "España, 1013")
//                        LocalDateTime.of(2022,02,1,8,0)
                ),
                new Employee(
                        3L,
                        "Lucas",
                        "Fernandez",
                        TypeCategory.PAINTER,
                        "https://bootdey.com/img/Content/avatar/avatar3.png",
                        new Geolocation(-37.99738,-57.56201, "Av Colon 3771")
//                        LocalDateTime.of(2023,03,1,8,0)
                )
        ));
        try {
            mapper.writeValue(file, employees);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void LoadToDataBase(EmployeeService employeeService) {
        File file = new File("src/main/java/com/Trionfini/EmployeeManager/utils/fileEmployees.json");
        ObjectMapper mapper = new ObjectMapper();

        List<Employee> employees = new ArrayList<>();
        try {
            employees = mapper.readValue(file, new TypeReference<List<Employee>>(){} );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(employees);

        for (Employee employee : employees) {
            employeeService.saveEmployee(employee);
        }

    }


}
