package com.andres_k.og.utils.http;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Map;

@Service
public class HttpClient {
    @Value("${app.origin}")
    private String origin;

    private RestTemplate restTemplate;

    @Autowired
    private HttpClient() throws CertificateException, NoSuchAlgorithmException, KeyStoreException, IOException, KeyManagementException {
        System.setProperty("sun.net.http.allowRestrictedHeaders", "true");
        CloseableHttpClient httpClient = this.clientWithSSL(false);
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setHttpClient(httpClient);
        this.restTemplate = new RestTemplate(requestFactory);
        this.restTemplate.setErrorHandler(new HttpErrorHandler());
    }

    private CloseableHttpClient clientWithSSL(boolean status) throws CertificateException, NoSuchAlgorithmException, KeyStoreException, IOException, KeyManagementException {
        if (status) {
            KeyStore trustStore = this.loadCertificate();
            TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
            SSLContext sslContext = SSLContextBuilder
                    .create()
                    .loadTrustMaterial(trustStore, acceptingTrustStrategy)
                    .build();
            return HttpClients.custom()
                    .setSSLContext(sslContext)
                    .build();
        }
        return HttpClients.createDefault();
    }

    private KeyStore loadCertificate() throws KeyStoreException, CertificateException, NoSuchAlgorithmException, IOException {
        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
        trustStore.load(null); // Make an empty store
        InputStream fis = ClassLoader.class.getResourceAsStream("/certificates/certificate.cer");
        BufferedInputStream bis = new BufferedInputStream(fis);

        CertificateFactory cf = CertificateFactory.getInstance("X.509");

        while (bis.available() > 0) {
            Certificate cert = cf.generateCertificate(bis);
            trustStore.setCertificateEntry("fiddler" + bis.available(), cert);
        }
        return trustStore;
    }

    private String formatUriParameters(String uri, Map<String, String> parameters) {
        if (parameters == null)
            return uri;
        if (parameters.size() != 0) {
            uri += "?";
        }
        boolean isFirst = true;
        StringBuilder uriBuilder = new StringBuilder(uri);
        for (Map.Entry<String, String> entry : parameters.entrySet()) {
            if (!isFirst)
                uriBuilder.append("&");
            uriBuilder.append(entry.getKey()).append("=").append(entry.getValue());
            isFirst = false;
        }
        uri = uriBuilder.toString();
        return uri;
    }

    private HttpHeaders createHeader(Map<String, String> headers) {
        HttpHeaders header = new HttpHeaders();
        if (headers == null)
            return header;
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            header.add(entry.getKey(), entry.getValue());
        }
        header.setOrigin(this.origin);
        return header;
    }

    private <R> ResponseEntity<R> withUriParameters(ParameterizedTypeReference<R> type, String uri, Map<String, String> parameters, Map<String, String> headers) throws HttpClientErrorException {
        uri = formatUriParameters(uri, parameters);
        HttpEntity<String> entity = new HttpEntity<>("parameters", createHeader(headers));
        return this.restTemplate.exchange(uri, HttpMethod.GET, entity, type);
    }

    private <R, D> ResponseEntity<R> withBody(ParameterizedTypeReference<R> type, HttpMethod method, String uri, D data, Map<String, String> headers) throws HttpClientErrorException {
        HttpEntity<D> entity = new HttpEntity<>(data, createHeader(headers));
        return this.restTemplate.exchange(uri, method, entity, type);
    }

    public <R> R GET(ParameterizedTypeReference<R> type, String uri, Map<String, String> parameters, Map<String, String> headers) throws HttpClientErrorException {
        ResponseEntity<R> response = withUriParameters(type, uri, parameters, headers);
        return response.getBody();
    }

    public <R, D> R POST(ParameterizedTypeReference<R> type, String uri, D data, Map<String, String> headers) throws HttpClientErrorException {
        ResponseEntity<R> response = withBody(type, HttpMethod.POST, uri, data, headers);
        return response.getBody();
    }

    public <R, D> R PUT(ParameterizedTypeReference<R> type, String uri, D data, Map<String, String> headers) throws HttpClientErrorException {
        ResponseEntity<R> response = withBody(type, HttpMethod.PUT, uri, data, headers);
        return response.getBody();
    }

    public <R, D> R DELETE(ParameterizedTypeReference<R> type, String uri, D data, Map<String, String> headers) throws HttpClientErrorException {
        ResponseEntity<R> response = withBody(type, HttpMethod.DELETE, uri, data, headers);
        return response.getBody();
    }
}
