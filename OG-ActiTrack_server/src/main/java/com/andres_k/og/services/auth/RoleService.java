package com.andres_k.og.services.auth;

import com.andres_k.og.dao.auth.RoleRepository;
import com.andres_k.og.models.auth.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role getRoleByValue(String value) {
        Optional<Role> optRole = this.roleRepository.findByName(value);
        if (!optRole.isPresent())
            throw new EntityNotFoundException("Cannot find the role for the given value [" + value + "].");
        return optRole.get();
    }

    public Role getRoleById(Long id) {
        Optional<Role> optRole = this.roleRepository.findById(id);
        if (!optRole.isPresent())
            throw new EntityNotFoundException("Cannot find the role for the  given id.");
        return optRole.get();
    }
}
