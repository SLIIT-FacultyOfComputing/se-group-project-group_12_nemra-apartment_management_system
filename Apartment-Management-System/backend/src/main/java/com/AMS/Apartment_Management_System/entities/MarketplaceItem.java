package com.AMS.Apartment_Management_System.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "marketplace_items")
public class MarketplaceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column
    private String image;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String sellerId;

    @Column(nullable = false)
    private String sellerName;

    @Column(nullable = false)
    private String date;
} 