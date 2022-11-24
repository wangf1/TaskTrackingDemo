package com.wangf.tasktracking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USERS")
@Data
public class User {

    private static final PasswordEncoder ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String email;

    private String phone;

    @JsonIgnore
    private String password;

    private String[] roles;

    public void setPassword(String password) {
        this.password = ENCODER.encode(password);
    }
}
