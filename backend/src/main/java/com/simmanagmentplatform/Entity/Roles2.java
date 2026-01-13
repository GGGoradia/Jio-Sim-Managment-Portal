package com.simmanagmentplatform.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="roles")
public class Roles2 {
    @Id
    @Column(name = "id",length = 36)
    private String id;

    @Column(name = "role_name",length = 50)
    private String roleName;
    
    public String getRoleId(){
        String roleid=id;
        return roleid;
    }
    public String getRoleName(){
        String name=roleName;
        return name;
    }

}
