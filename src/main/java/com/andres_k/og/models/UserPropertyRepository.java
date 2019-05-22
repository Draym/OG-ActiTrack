package com.andres_k.og.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPropertyRepository<T extends UserProperty> extends JpaRepository<T, Long> {

    T getByName(String name);

    T getByIdAndUserId(Long id, Long userId);

    List<T> getAllByUserId(Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}
