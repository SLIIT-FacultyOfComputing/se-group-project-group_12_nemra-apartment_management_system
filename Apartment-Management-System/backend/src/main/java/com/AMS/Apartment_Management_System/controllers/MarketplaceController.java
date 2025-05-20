package com.AMS.Apartment_Management_System.controllers;

import com.AMS.Apartment_Management_System.Services.MarketplaceService;
import com.AMS.Apartment_Management_System.entities.MarketplaceItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketplaceController {

    @Autowired
    private MarketplaceService marketplaceService;

    @GetMapping
    public ResponseEntity<List<MarketplaceItem>> getAllItems() {
        return ResponseEntity.ok(marketplaceService.getAllItems());
    }

    @PostMapping
    public ResponseEntity<MarketplaceItem> createItem(@RequestBody MarketplaceItem item) {
        return ResponseEntity.ok(marketplaceService.createItem(item));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarketplaceItem> getItemById(@PathVariable Long id) {
        MarketplaceItem item = marketplaceService.getItemById(id);
        return item != null ? ResponseEntity.ok(item) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        marketplaceService.deleteItem(id);
        return ResponseEntity.ok().build();
    }
} 