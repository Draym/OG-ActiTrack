package com.andres_k.og.config;

@Deprecated
public class HttpResponse {
    public boolean hasError;
    public Object result;
    public String error;

    public HttpResponse(){
    }

    public HttpResponse(Object result) {
        this.addResult(result);
    }
    public HttpResponse(String error) {
        this.addError(error);
    }

    public void addResult(Object result) {
        this.result = result;
        this.hasError = false;
    }

    public void addError(String error) {
        this.result = null;
        this.error = error;
        this.hasError = true;
    }
}
