package com.Trionfini.EmployeeManager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native") // necesario para el import sql, sino no me autogenera, y si los genero manual, el primero que agregue me tira un exception
    private Long id;
    private String name;
    private String lastName;

    private TypeCategory jobCategory;
    private String imgUrl;
    private transient LocalDateTime dateAdmission;

    private  Geolocation geolocation;

    public Employee() {
    }

    public Employee(Long id, String name, String lastName, TypeCategory jobCategory, String imgUrl) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.jobCategory = jobCategory;
        this.imgUrl = imgUrl;
    }

    public Employee(String name, String lastName, TypeCategory jobCategory, String imgUrl, LocalDateTime dateAdmission) {
        this.name = name;
        this.lastName = lastName;
        this.jobCategory = jobCategory;
        this.imgUrl = imgUrl;
        this.dateAdmission = dateAdmission;
    }

    public Employee(Long id, String name, String lastName, TypeCategory jobCategory, String imgUrl, Geolocation geolocation) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.jobCategory = jobCategory;
        this.imgUrl = imgUrl;
        this.geolocation = geolocation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public TypeCategory getJob() {
        return jobCategory;
    }

    public void setJob(TypeCategory jobCategory) {
        this.jobCategory = jobCategory;
    }

    public LocalDateTime getDateAdmission() {
        return dateAdmission;
    }

    public void setDateAdmission(LocalDateTime dateAdmission) {
        this.dateAdmission = dateAdmission;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Geolocation getGeolocation() {
        return geolocation;
    }

    public void setGeolocation(Geolocation geolocation) {
        this.geolocation = geolocation;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", jobCategory='" + jobCategory + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", dateAdmission=" + dateAdmission +
                ", geolocation=" + geolocation +
                '}';
    }
}
