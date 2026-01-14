package com.simmanagmentplatform.ServiceIMP;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.simmanagmentplatform.Dto.AgentDTO;
import com.simmanagmentplatform.Entity.AgentEntity;
import com.simmanagmentplatform.Reposiotry.AgentRepo;
import com.simmanagmentplatform.Services.AgentServices;

@Service
public class AgentServicesIMP implements AgentServices {
    private final AgentRepo agentRepo;
    public AgentServicesIMP(AgentRepo agentRepo){
        this.agentRepo=agentRepo;
    }
    @Override
    public AgentEntity addInventory(AgentDTO dto){
        AgentEntity agentEntity= new AgentEntity();
        agentEntity.setIccid(dto.getIccid());
        agentEntity.setAgent(dto.getAgent());
        agentEntity.setStatus(dto.getStatus());
        agentEntity.setMakeModel(dto.getMakeModel());
        agentEntity.setDateOfEntry(LocalDate.now());

        return agentRepo.save(agentEntity);
    }

    @Override
    public List<AgentEntity> getAllInventory(){
        return agentRepo.findAll();
    };

}
