package com.example.demo.entity;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class WalletConstraintTest {

    @Autowired
    private EntityManager entityManager;

    @Test
    void shouldRejectDuplicateWalletAddress() {
        Wallet first = new Wallet("0xABC12345", BigDecimal.ZERO);
        entityManager.persist(first);
        entityManager.flush();

        Wallet duplicate = new Wallet("0xABC12345", BigDecimal.ONE);
        assertThrows(RuntimeException.class, () -> {
            entityManager.persist(duplicate);
            entityManager.flush();
        });
    }

    @Test
    void shouldRejectNullWalletAddress() {
        Wallet wallet = new Wallet(null, BigDecimal.ZERO);
        assertThrows(RuntimeException.class, () -> {
            entityManager.persist(wallet);
            entityManager.flush();
        });
    }
}
