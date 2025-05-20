package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.MarketplaceItem;
import com.AMS.Apartment_Management_System.repositories.MarketplaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketplaceServiceImpl implements MarketplaceService {

    @Autowired
    private MarketplaceRepository marketplaceRepository;

    @Override
    public List<MarketplaceItem> getAllItems() {
        return marketplaceRepository.findAll();
    }

    @Override
    public MarketplaceItem createItem(MarketplaceItem item) {
        return marketplaceRepository.save(item);
    }

    @Override
    public MarketplaceItem getItemById(Long id) {
        return marketplaceRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteItem(Long id) {
        marketplaceRepository.deleteById(id);
    }
} 