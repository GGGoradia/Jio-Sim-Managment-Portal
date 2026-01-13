package com.simmanagmentplatform.Reposiotry;
import org.springframework.data.jpa.repository.JpaRepository;
import com.simmanagmentplatform.Entity.User_portalEntity;

import java.util.Optional;
public interface User_portalRepo extends JpaRepository<User_portalEntity,String>{
    Optional<User_portalEntity> findByEmail(String email);
}
