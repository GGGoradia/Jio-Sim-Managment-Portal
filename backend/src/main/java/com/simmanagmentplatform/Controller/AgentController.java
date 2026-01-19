package com.simmanagmentplatform.Controller;

import com.simmanagmentplatform.Dto.AgentDTO;
import com.simmanagmentplatform.Entity.AgentEntity;
import com.simmanagmentplatform.Services.AgentServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AgentController {

    private final AgentServices agentService;

    @PostMapping("/add")
    public AgentEntity addInventory(@RequestBody @Valid AgentDTO dto) {
        return agentService.addInventory(dto);
    }

    @GetMapping("/all")
    public List<AgentEntity> getAllInventory() {
        return agentService.getAllInventory();
    }

    @PutMapping("/update/{oldIccid}")
    public AgentEntity updateInventory(
            @PathVariable String oldIccid,
            @RequestBody @Valid AgentDTO dto
    ) {
        return agentService.updateInventory(oldIccid, dto);
    }
}
