package com.simmanagmentplatform.ServiceIMP;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simmanagmentplatform.Dto.LoginResponseDTO;
import com.simmanagmentplatform.Entity.Roles2;
import com.simmanagmentplatform.Entity.UserRolesEntity;
import com.simmanagmentplatform.Entity.User_portalEntity;
import com.simmanagmentplatform.Reposiotry.UserRolesRepo;
import com.simmanagmentplatform.Reposiotry.User_portalRepo;
import com.simmanagmentplatform.Reposiotry.roles2Repo;
import com.simmanagmentplatform.Services.AuthServices;

@Service
public class AuthServicesIMP implements AuthServices {
    @Autowired
    private User_portalRepo user_portalRepo;

    @Autowired
    private UserRolesRepo userRolesRepo;

    @Autowired
    private roles2Repo Roles2Repo;

        
    @Override
    public LoginResponseDTO login(String email, String password) {

        User_portalEntity user= user_portalRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("passsword is wrong");
        }
        List<UserRolesEntity> userRoles=userRolesRepo.findByUserId(user.getID());
        List<String> roles = userRoles.stream().map(ur -> Roles2Repo.findById(ur.getRoleId()).orElseThrow(() -> new RuntimeException("Role Not Found")).getRoleName()).toList();
        return new LoginResponseDTO(user.getID(),user.getName(),roles);
    }
    
}
