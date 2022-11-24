package com.wangf.tasktracking.repository;

import com.wangf.tasktracking.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN') or #user?.name == authentication?.name")
    User save(@Param("user") User user);

    @PreAuthorize("hasRole('ROLE_ADMIN') or #name == authentication?.name")
    User findByName(@Param("name") String name);

}
