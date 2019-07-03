package com.andres_k.og.services;

import com.andres_k.og.models.enums.ERoles;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.user.UserRole;
import com.andres_k.og.dao.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    @Autowired
    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public boolean isUserAllowed(User user, List<ERoles> allowed) {
        List<UserRole> userRoles = this.userRoleRepository.getAllByUserId(user.getId());

        for (ERoles role : allowed) {
            for (UserRole userRole : userRoles) {
                if (role.isEquals(userRole.getRole()))
                    return true;
            }
        }
        return false;
    }

    public boolean isUserAllowed(User user, ERoles required) {
        List<UserRole> userRoles = this.userRoleRepository.getAllByUserId(user.getId());

        for (UserRole userRole : userRoles) {
            if (required.isEquals(userRole.getRole()))
                return true;
        }
        return false;
    }
}
