package com.andres_k.og.dao.message;

import com.andres_k.og.models.item.message.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
