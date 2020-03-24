package com.andres_k.og.services;

import com.andres_k.og.models.auth.User;
import com.andres_k.og.models.http.MessageCtn;
import com.andres_k.og.utils.http.HttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailClient {
    @Value("${app.name}")
    private String appName;
    @Value("${app.url.verification}")
    private String urlVerification;
    @Value("${app.url.forgot_password}")
    private String urlForgotPassword;
    @Value("${mail.api.key}")
    private String apiKey;
    @Value("${mail.api.url}")
    private String apiUrl;
    @Value("${mail.api.endpoint.toAdmin}")
    private String endpointToAdmin;
    @Value("${mail.api.endpoint.send}")
    private String endpointSend;

    private final HttpClient httpClient;

    @Autowired
    private EmailClient(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    private void addFooter(StringBuilder body) {
        body.append("<br/>");
        body.append("You can message us, by replying this email.");
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

    public Boolean sendVerification(User user, String verification) {
        String subject = "Verification email for " + this.appName;
        String verificationLink = this.urlVerification + verification;

        StringBuilder body = new StringBuilder();
        body.append(user.getPseudo());
        body.append(", welcome to ");
        body.append(this.appName);
        body.append("<br/>");
        body.append("<br/>");
        body.append("Please click on this link in order to validate your account:");
        this.addVerificationLink(body, verificationLink);
        this.addFooter(body);
        return this.send(user.getPseudo(), user.getEmail(), subject, body.toString());
    }

    public Boolean sendPasswordForget(User user, String verification) {
        String subject = "Password reset for " + this.appName;
        String verificationLink = this.urlForgotPassword + verification;

        StringBuilder body = new StringBuilder();
        body.append(user.getPseudo());
        body.append(", we have received a password reset request on ");
        body.append(this.appName);
        body.append("<br/>");
        body.append("<br/>");
        body.append("Please click on this link in order to reset your password:");
        this.addVerificationLink(body, verificationLink);
        body.append("<br/>");
        body.append("If the request has not been made by yourself, do not worry, your password has not been compromise.");
        this.addFooter(body);

        return this.send(user.getPseudo(), user.getEmail(), subject, body.toString());
    }

    public Boolean send(String name, String email, String subject, String body) {
        MessageCtn mail = new MessageCtn(name, null, email, subject, body);
        Map<String, String> headers = new HashMap<>();
        headers.put("ApiKey", this.apiKey);
        return this.httpClient.POST(new ParameterizedTypeReference<Boolean>() {
        }, this.apiUrl + this.endpointSend, mail, headers);
    }

    public Boolean sendToAdmin(String name, String email, String subject, String body) {
        MessageCtn mail = new MessageCtn(name, email, null, subject, body);
        Map<String, String> headers = new HashMap<>();
        headers.put("ApiKey", this.apiKey);
        return this.httpClient.POST(new ParameterizedTypeReference<Boolean>() {
        }, this.apiUrl + this.endpointToAdmin, mail, headers);
    }
}
