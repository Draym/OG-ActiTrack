package com.andres_k.og.services;

import com.andres_k.og.models.auth.ERoles;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.user.UserRole;
import com.andres_k.og.models.auth.user.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService {
    @Autowired
    UserRoleRepository userRoleRepository;

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
