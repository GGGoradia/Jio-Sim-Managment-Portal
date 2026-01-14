package com.simmanagmentplatform.Reposiotry;

import com.simmanagmentplatform.Entity.AgentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepo extends JpaRepository<AgentEntity,String> {
    
}
