package com.andres_k.og.utils.data;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

public class Configs {

    private final Properties properties;

    public String value(String key) {
        return this.properties.getProperty(key);
    }

    /**
     * SINGLETON
     **/
    private static Configs instance;

    private Configs() {
        Properties properties1;
        Resource resource = new ClassPathResource("/config.properties");
        try {
            properties1 = PropertiesLoaderUtils.loadProperties(resource);
        } catch (IOException e) {
            properties1 = new Properties();
            e.printStackTrace();
        }
        this.properties = properties1;
    }

    public static Configs get() {
        if (instance == null) {
            instance = new Configs();
        }
        return instance;
    }
}
