package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.MarketplaceItem;
import java.util.List;

public interface MarketplaceService {
    List<MarketplaceItem> getAllItems();
    MarketplaceItem createItem(MarketplaceItem item);
    MarketplaceItem getItemById(Long id);
    void deleteItem(Long id);
} 