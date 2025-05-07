package com.AMS.Apartment_Management_System.repositories;

import com.AMS.Apartment_Management_System.entities.Payment;
import com.AMS.Apartment_Management_System.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBill(Bill bill);
    List<Payment> findByStatus(String status);
    Payment findByTransactionId(String transactionId);
} 