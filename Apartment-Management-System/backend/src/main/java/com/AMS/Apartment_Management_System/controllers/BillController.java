package com.AMS.Apartment_Management_System.controllers;

import com.AMS.Apartment_Management_System.Services.BillService;
import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.entities.User;
import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:3000")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(billService.createBill(bill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(@PathVariable Long id, @RequestBody Bill bill) {
        bill.setId(id);
        return ResponseEntity.ok(billService.updateBill(bill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        Bill bill = billService.getBillById(id);
        return bill != null ? ResponseEntity.ok(bill) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(billService.getAllBills());
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Bill>> getBillsByUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(billService.getBillsByUser(user));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Bill>> getBillsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(billService.getBillsByStatus(status));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Bill>> getBillsByType(@PathVariable String type) {
        return ResponseEntity.ok(billService.getBillsByType(type));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Bill>> getOverdueBills() {
        return ResponseEntity.ok(billService.getOverdueBills());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateBillStatus(@PathVariable Long id, @RequestParam String status) {
        billService.updateBillStatus(id, status);
        return ResponseEntity.ok().build();
    }
} 