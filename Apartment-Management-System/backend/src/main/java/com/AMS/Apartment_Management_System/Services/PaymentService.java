package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Payment;
import com.AMS.Apartment_Management_System.entities.Bill;

import java.util.List;

public interface PaymentService {
    Payment createPayment(Payment payment);
    Payment getPaymentById(Long id);
    List<Payment> getPaymentsByBill(Bill bill);
    List<Payment> getPaymentsByStatus(String status);
    Payment getPaymentByTransactionId(String transactionId);
    void updatePaymentStatus(Long id, String status);
    String generateReceipt(Long paymentId);
} 