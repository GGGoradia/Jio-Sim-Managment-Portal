package com.simmanagmentplatform.Controller;

import com.simmanagmentplatform.Dto.AgentDTO;
import com.simmanagmentplatform.Entity.AgentEntity;
import com.simmanagmentplatform.Services.AgentServices;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {
    private final AgentServices agentServices;
    public AgentController(AgentServices agentServices){
        this.agentServices=agentServices;
    } 

    @PostMapping("add")
    public AgentEntity addInventory(@RequestBody @Valid AgentDTO dto){
        return agentServices.addInventory(dto);
    }  
    @GetMapping("all")
    public List<AgentEntity> getAllInventory(){
        return agentServices.getAllInventory();
    }
}
