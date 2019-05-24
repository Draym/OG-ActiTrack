package com.andres_k.og.utils.managers;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.utils.tools.TString;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Method;

public class EndpointManager {
    public static Class getClass(String endpoint) throws ClassNotFoundException {

        if (TString.getFirst(endpoint).equals("/"))
            endpoint = TString.removeFirst(endpoint);
        String[] blocs = endpoint.split("/");

        if (blocs.length < 2)
            throw new ClassNotFoundException("cannot find a controller for this endpoint");

        String basePackage = "com.andres_k.og.controllers.";
        String ctrlPackage;
        int classIndex = 1;

        if (blocs[1].equals("admin")) {
            ctrlPackage = "admin.";
            classIndex = 2;
        } else if (blocs[1].equals("auth")) {
            ctrlPackage = "";
        } else
            ctrlPackage = "user.";

        if (blocs.length < classIndex + 1)
            throw new ClassNotFoundException("cannot find a controller for this endpoint");

        String className = TString.capitalizeFirst(blocs[classIndex]);

        return Class.forName(basePackage + ctrlPackage + className + "Controller");
    }

    public static Restricted getRestriction(String endpoint) throws ClassNotFoundException {

        Class ctrl = EndpointManager.getClass(endpoint);

        if (ctrl.isAnnotationPresent(Restricted.class)) {
            return (Restricted) ctrl.getAnnotation(Restricted.class);
        } else {
            return getRestrictionFromMethod(ctrl, endpoint);
        }
    }

    private static Restricted getRestrictionFromMethod(Class ctrl, String endpoint) {
        for (Method func : ctrl.getDeclaredMethods()) {

            if (func.isAnnotationPresent(RequestMapping.class)) {
                RequestMapping mapping = func.getAnnotation(RequestMapping.class);

                if (!requestContainsEndpoint(mapping, endpoint))
                    continue;

                if (func.isAnnotationPresent(Restricted.class)) {
                    return func.getAnnotation(Restricted.class);
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    private static boolean requestContainsEndpoint(RequestMapping mapping, String endpoint) {
        for (String value : mapping.value()) {
            if (value.equals(endpoint))
                return true;
        }
        return false;
    }
}
