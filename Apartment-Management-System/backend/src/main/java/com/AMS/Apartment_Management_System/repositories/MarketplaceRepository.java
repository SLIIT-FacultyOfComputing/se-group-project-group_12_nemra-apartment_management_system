package com.AMS.Apartment_Management_System.repositories;

import com.AMS.Apartment_Management_System.entities.MarketplaceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketplaceRepository extends JpaRepository<MarketplaceItem, Long> {
} 