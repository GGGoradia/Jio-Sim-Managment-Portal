package com.simmanagmentplatform.Services;
import com.simmanagmentplatform.Dto.LoginResponseDTO;
public interface AuthServices {
    LoginResponseDTO login (String email,String password);
    
}
