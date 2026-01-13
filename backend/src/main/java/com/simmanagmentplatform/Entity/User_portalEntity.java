package com.simmanagmentplatform.Entity;
import jakarta.persistence.*;
@Entity
@Table(name="user_portal")
public class User_portalEntity {
    @Id
    @Column(length = 36)
    private String id;

    @Column(name="name",length = 100)
    private String name;

    @Column(name="mobile_number",length=15,unique = true)
    private String mobileNumber;

    @Column(name = "email",length = 150,unique = true)
    private String email;

    @Column(name = "password_hash")
    private String password;

    @Column(name="address")
    private String address;

    @Column(name = "pan_number",unique = true,length = 10)
    private String panNumber;

    @Column(name="aadhaar_number",unique = true,length = 12)
    private String aadhaarNumber;

    public String getPassword(){
        return password;
    }
    public String getID(){
        return id;
    }
    public String getName(){
        return name;
    }
    


}
