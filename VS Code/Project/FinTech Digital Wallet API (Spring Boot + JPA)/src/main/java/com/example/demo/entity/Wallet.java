package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

// TODO: Mark this class as a JPA Entity
@Entity
public class Wallet {

    @Id
    // TODO: Configure it to Auto-Increment (IDENTITY strategy)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String walletAddress;

    // Using BigDecimal is best practice for money
    private BigDecimal balance;

    // Default Constructor
    public Wallet() {
    }

    // Parameterized Constructor
    public Wallet(String walletAddress, BigDecimal balance) {
        this.walletAddress = walletAddress;
        this.balance = balance;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
