package com.andres_k.og.config;

import com.andres_k.og.services.auth.AuthorizationService;
import com.andres_k.og.utils.tools.TString;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

@Aspect
@Component
public class HttpRequestAspect {
    @Autowired
    AuthorizationService authService;

    @Around("@annotation(Restricted)")
    public Object verifyAuthorization(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        Restricted restriction = method.getAnnotation(Restricted.class);
        String token = request.getHeader("Authorization");

        int errorStatus = 0;
        String errorMessage = "";

        if (restriction == null) {
            errorStatus = HttpStatus.INTERNAL_SERVER_ERROR.value();
            errorMessage = "The restriction field is missing.";
        }
        if (TString.isNull(token)) {
            errorStatus = HttpStatus.FORBIDDEN.value();
            errorMessage = "The Authorization and Origin fields are required in the http header.";
        }

        if (errorStatus == 0) {
            try {
                if (this.authService.isAuthorized(restriction, token))
                    return joinPoint.proceed();
            } catch (SecurityException e) {
                errorStatus = HttpStatus.UNAUTHORIZED.value();
                errorMessage = e.getMessage();
            } catch (EntityNotFoundException e) {
                errorStatus = HttpStatus.NOT_FOUND.value();
                errorMessage = e.getMessage();
            } catch (Exception e) {
                errorStatus = HttpStatus.INTERNAL_SERVER_ERROR.value();
                errorMessage = e.getMessage();
            }
        }
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        response.sendError(errorStatus, errorMessage);
        return null;
    }
}
