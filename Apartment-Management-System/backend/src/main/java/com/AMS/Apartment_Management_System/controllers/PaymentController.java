package com.AMS.Apartment_Management_System.controllers;

import com.AMS.Apartment_Management_System.Services.PaymentService;
import com.AMS.Apartment_Management_System.entities.Payment;
import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.Services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BillService billService;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.createPayment(payment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        return payment != null ? ResponseEntity.ok(payment) : ResponseEntity.notFound().build();
    }

    @GetMapping("/bill/{billId}")
    public ResponseEntity<List<Payment>> getPaymentsByBill(@PathVariable Long billId) {
        Bill bill = billService.getBillById(billId);
        if (bill != null) {
            return ResponseEntity.ok(paymentService.getPaymentsByBill(bill));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<Payment> getPaymentByTransactionId(@PathVariable String transactionId) {
        Payment payment = paymentService.getPaymentByTransactionId(transactionId);
        return payment != null ? ResponseEntity.ok(payment) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updatePaymentStatus(@PathVariable Long id, @RequestParam String status) {
        paymentService.updatePaymentStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/receipt")
    public ResponseEntity<String> generateReceipt(@PathVariable Long id) {
        String receiptUrl = paymentService.generateReceipt(id);
        return receiptUrl != null ? ResponseEntity.ok(receiptUrl) : ResponseEntity.notFound().build();
    }
} 