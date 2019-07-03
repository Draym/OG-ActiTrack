package com.andres_k.og.services;

import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import com.andres_k.og.dao.PasswordSecurityLinkRepository;
import com.andres_k.og.dao.UserActivationLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityLinkService {
    private final UserActivationLinkRepository userActivationLinkRepository;
    private final PasswordSecurityLinkRepository passwordSecurityLinkRepository;

    @Autowired
    public SecurityLinkService(UserActivationLinkRepository userActivationLinkRepository, PasswordSecurityLinkRepository passwordSecurityLinkRepository) {
        this.userActivationLinkRepository = userActivationLinkRepository;
        this.passwordSecurityLinkRepository = passwordSecurityLinkRepository;
    }

    public PasswordSecurityLink getPasswordSecurityLink(String identifier) {
        Optional<PasswordSecurityLink> optPasswordSecurityLink = this.passwordSecurityLinkRepository.findByIdentifier(identifier);
        if (!optPasswordSecurityLink.isPresent())
            throw new SecurityException("The password security link is not valid.");
        PasswordSecurityLink passwordSecurityLink = optPasswordSecurityLink.get();
        if (!passwordSecurityLink.isValid())
            throw new SecurityException("The password security link has expired.");
        return passwordSecurityLink;
    }
}
