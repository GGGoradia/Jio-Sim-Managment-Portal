package com.simmanagmentplatform.Controller;

import com.simmanagmentplatform.Dto.LoginResponseDTO;
import com.simmanagmentplatform.Services.AuthServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class SimpleAuthController {

    @Autowired
    private AuthServices authService;

    // check endpoint (TEMP but useful)
    @GetMapping("/test")
    public String test() {
        return "AUTH CONTROLLER WORKING";
    }

    //  Login endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody Map<String, String> request) {

        LoginResponseDTO response = authService.login(
                request.get("email"),
                request.get("password")
        );

        return ResponseEntity.ok(response);
    }
}
