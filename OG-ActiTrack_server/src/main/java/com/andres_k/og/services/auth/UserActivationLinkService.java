package com.andres_k.og.services.auth;

import com.andres_k.og.dao.auth.UserActivationLinkRepository;
import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.auth.link.UserActivationLink;
import com.andres_k.og.services.EmailClient;
import com.andres_k.og.utils.tools.TRandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class UserActivationLinkService {
    private final EmailClient emailClient;
    private final UserActivationLinkRepository userActivationLinkRepository;

    @Autowired
    public UserActivationLinkService(EmailClient emailClient, UserActivationLinkRepository userActivationLinkRepository) {
        this.emailClient = emailClient;
        this.userActivationLinkRepository = userActivationLinkRepository;
    }

    public void sendVerificationUserEmail(User user) throws IOException, MessagingException {
        // createToken UserActivationLink
        UserActivationLink userActivationLink = new UserActivationLink();
        userActivationLink.setDate(new Date());
        userActivationLink.setUserId(user.getId());
        userActivationLink.setIdentifier(TRandomString.get().generate());
        this.userActivationLinkRepository.save(userActivationLink);

        // send verification email
        this.emailClient.sendVerification(user, userActivationLink.getIdentifier());
    }

    public void deleteAllByUserId(Long id) {
        this.userActivationLinkRepository.deleteAllByUserId(id);
    }

    /**
     * GETTERS
     **/
    public UserActivationLink getByIdentifier(String identifier) {
        Optional<UserActivationLink> optUserActivation = this.userActivationLinkRepository.findByIdentifier(identifier);

        if (!optUserActivation.isPresent())
            throw new EntityNotFoundException("The identifier link {" + identifier + "} is invalid.");
        return optUserActivation.get();
    }
}
