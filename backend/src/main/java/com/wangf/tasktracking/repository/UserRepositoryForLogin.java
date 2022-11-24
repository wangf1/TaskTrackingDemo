package com.wangf.tasktracking.repository;

import com.wangf.tasktracking.model.User;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserRepositoryForLogin extends Repository<User, Long> {

    User findByName(@Param("name") String name);

}
