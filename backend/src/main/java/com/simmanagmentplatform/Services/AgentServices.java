package com.simmanagmentplatform.Services;
import java.util.List;
import com.simmanagmentplatform.Dto.AgentDTO;
import com.simmanagmentplatform.Entity.AgentEntity;
public interface AgentServices {
    AgentEntity addInventory (AgentDTO dto);
    List<AgentEntity> getAllInventory();
}
