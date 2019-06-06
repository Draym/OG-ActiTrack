package com.andres_k.og.services;

import com.andres_k.og.models.auth.TokenRepository;
import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import com.andres_k.og.models.auth.link.PasswordSecurityLinkRepository;
import com.andres_k.og.models.auth.link.UserActivationLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityLinkService {
    @Autowired
    private UserActivationLinkRepository userActivationLinkRepository;
    @Autowired
    private PasswordSecurityLinkRepository passwordSecurityLinkRepository;

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
