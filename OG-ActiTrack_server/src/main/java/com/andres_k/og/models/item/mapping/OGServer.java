package com.andres_k.og.models.item.mapping;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity(name = "OGServer")
@Table(name = "og_server")
public class OGServer {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="server")
    private String server;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }
}
