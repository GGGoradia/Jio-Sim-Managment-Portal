package com.simmanagmentplatform.Entity;
import jakarta.persistence.*;

@Entity
@Table(name="user_roles")
public class UserRolesEntity {
    @Id
    @Column(length = 36)
    private String id;

    @Column(name="user_id",length=36)
    private String userId;

    @Column(name="role_id",length = 36)
    private String roleId;

    public String getRoleId(){
        return roleId;
    }
}
