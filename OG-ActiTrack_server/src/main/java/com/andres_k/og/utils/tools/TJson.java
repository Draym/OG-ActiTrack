package com.andres_k.og.utils.tools;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class TJson {
    public static String toString(Object object, boolean defaultTyping){
        if (object == null)
            return null;
        ObjectMapper mapper = new ObjectMapper();
        if(defaultTyping)
            mapper.enableDefaultTyping();

        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            Console.log_err("TJson: " + e.getMessage());
        }
        return null;
    }

    public static String toString(Object object){
        return toString(object, false);
    }

    public static <T> T toObject(String json, Class<T> classValue) throws IOException {
        if (json == null)
            return null;
        ObjectMapper mapper = new ObjectMapper();
        mapper.enableDefaultTyping();

        return mapper.readValue(json, classValue);
    }
    public static <T> T toObject(String json, TypeReference type) throws IOException {
        if (json == null)
            return null;
        ObjectMapper mapper = new ObjectMapper();
        mapper.enableDefaultTyping();

        return mapper.readValue(json, type);
    }

    public static Map<String, Object> convert(Object obj) {
        if (obj == null)
            return null;
        ObjectMapper m = new ObjectMapper();
        return m.convertValue(obj, new TypeReference<Map<String, String>>() {});
    }

    public static List<Map<String, Object>> convert(List<Object> obj) {
        if (obj == null)
            return null;
        ObjectMapper m = new ObjectMapper();
        return m.convertValue(obj, new TypeReference<List<Map<String, String>>>() {});
    }
}
