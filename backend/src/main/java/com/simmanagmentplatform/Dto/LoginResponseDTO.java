package com.simmanagmentplatform.Dto;
import java.util.List;

public class LoginResponseDTO {
    private String userId;
    private String name;
    private List<String> roles;

    public LoginResponseDTO(String userId, String name, List<String> roles){
        this.userId=userId;
        this.name=name;
        this.roles=roles;
    }
    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public List<String> getRoles() {
        return roles;
    }

}
