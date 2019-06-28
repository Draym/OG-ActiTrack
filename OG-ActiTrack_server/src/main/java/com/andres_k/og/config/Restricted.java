package com.andres_k.og.config;

import com.andres_k.og.models.enums.ERoles;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Restricted {
    ERoles required() default ERoles.USER;
}
