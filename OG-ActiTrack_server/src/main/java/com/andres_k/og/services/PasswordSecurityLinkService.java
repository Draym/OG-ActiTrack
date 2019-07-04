package com.andres_k.og.services;

import com.andres_k.og.dao.PasswordSecurityLinkRepository;
import com.andres_k.og.models.auth.link.PasswordSecurityLink;
import com.andres_k.og.utils.managers.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PasswordSecurityLinkService {
    private final PasswordSecurityLinkRepository passwordSecurityLinkRepository;

    @Autowired
    public PasswordSecurityLinkService(PasswordSecurityLinkRepository passwordSecurityLinkRepository) {
        this.passwordSecurityLinkRepository = passwordSecurityLinkRepository;
    }

    public PasswordSecurityLink create(Long userId) {
        PasswordSecurityLink passwordSecurityLink = new PasswordSecurityLink();
        passwordSecurityLink.setDate(new Date());
        passwordSecurityLink.setUserId(userId);
        passwordSecurityLink.setIdentifier(TokenManager.generate());
        passwordSecurityLink.setValid(true);
        return this.passwordSecurityLinkRepository.save(passwordSecurityLink);
    }

    public void update(PasswordSecurityLink passwordSecurityLink) {
        this.passwordSecurityLinkRepository.save(passwordSecurityLink);
    }

    /** GETTERS **/
    public PasswordSecurityLink getByIdentifier(String identifier) {
        Optional<PasswordSecurityLink> optPasswordSecurityLink = this.passwordSecurityLinkRepository.findByIdentifier(identifier);
        if (!optPasswordSecurityLink.isPresent())
            throw new SecurityException("The password security link is not valid.");
        PasswordSecurityLink passwordSecurityLink = optPasswordSecurityLink.get();
        if (!passwordSecurityLink.isValid())
            throw new SecurityException("The password security link has expired.");
        return passwordSecurityLink;
    }
}
