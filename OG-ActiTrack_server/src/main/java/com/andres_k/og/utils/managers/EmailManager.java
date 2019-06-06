package com.andres_k.og.utils.managers;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.utils.data.Configs;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.Properties;

public class EmailManager {
    private final Properties properties;
    private final Session session;

    private void addFooter(StringBuilder body) {
        body.append("<br/>");
        body.append("You can contact us, by replying this email.");
        body.append("<br/>");
        body.append("<br/>");
        body.append("Regards, Draymlab.fr");
    }

    private void addVerificationLink(StringBuilder body, String verificationLink) {
        body.append("<br/>");
        body.append("<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"");
        body.append(verificationLink);
        body.append("\">");
        body.append(verificationLink);
        body.append("</a>");
    }

    public void sendVerification(User user, String verification) throws MessagingException {
        String subject = "Verification email for " + Configs.get().value("website_name");
        String verificationLink = Configs.get().value("verification_url") + verification;

        StringBuilder body = new StringBuilder();
        body.append(user.getPseudo());
        body.append(", welcome to ");
        body.append(this.properties.getProperty("website"));
        body.append("<br/>");
        body.append("<br/>");
        body.append("Please click on this link in order to validate your account:");
        this.addVerificationLink(body, verificationLink);
        this.addFooter(body);
        this.send(user.getEmail(), subject, body.toString());
    }

    public void sendPasswordForget(User user, String verification) throws MessagingException {
        String subject = "Password reset for " + Configs.get().value("website_name");
        String verificationLink = Configs.get().value("password_forget_url") + verification;

        StringBuilder body = new StringBuilder();
        body.append(user.getPseudo());
        body.append(", we have received a password reset request on ");
        body.append(this.properties.getProperty("website"));
        body.append("<br/>");
        body.append("<br/>");
        body.append("Please click on this link in order to reset your password:");
        this.addVerificationLink(body, verificationLink);
        body.append("<br/>");
        body.append("If the request has not been made by yourself, do not worry, your password has not been compromise.");
        this.addFooter(body);

        this.send(user.getEmail(), subject, body.toString());
    }

    public void send(String email, String subject, String body) throws MessagingException {

        Message mail = new MimeMessage(this.session);
        mail.setFrom(new InternetAddress(this.properties.getProperty("from")));
        mail.setRecipients(
                Message.RecipientType.TO, InternetAddress.parse(email));
        mail.setSubject(subject);

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(body, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        mail.setContent(multipart);

        Transport.send(mail);
    }

    /**
     * SINGLETON
     **/
    private static EmailManager instance;

    private EmailManager() throws IOException {
        Resource resource = new ClassPathResource("/smtp.properties");
        this.properties = PropertiesLoaderUtils.loadProperties(resource);

        this.session = Session.getInstance(this.properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(properties.getProperty("username"), properties.getProperty("password"));
            }
        });
    }

    public static EmailManager get() throws IOException {
        if (instance == null) {
            instance = new EmailManager();
        }
        return instance;
    }
}
