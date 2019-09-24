package com.andres_k.og.dao.message;

import com.andres_k.og.models.item.message.BugReportMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BugReportMessageRepository extends JpaRepository<BugReportMessage, Long> {
}
