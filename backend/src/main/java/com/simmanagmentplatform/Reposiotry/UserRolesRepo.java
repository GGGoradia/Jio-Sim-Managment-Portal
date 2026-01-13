package com.simmanagmentplatform.Reposiotry;

import com.simmanagmentplatform.Entity.UserRolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRolesRepo extends JpaRepository<UserRolesEntity,String> {
   List<UserRolesEntity> findByUserId(String userId);
}
