package com.andres_k.og.config;

import com.andres_k.og.models.auth.ERoles;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Restricted {
    boolean tokenRequired() default true;
    ERoles[] roles() default ERoles.USER;
}
