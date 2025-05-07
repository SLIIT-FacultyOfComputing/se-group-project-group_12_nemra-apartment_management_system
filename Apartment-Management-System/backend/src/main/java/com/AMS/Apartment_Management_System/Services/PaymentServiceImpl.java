package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Payment;
import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillService billService;

    @Override
    public Payment createPayment(Payment payment) {
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("Pending");
        payment.setTransactionId(generateTransactionId());
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update bill status if payment is successful
        if (savedPayment.getStatus().equals("Success")) {
            billService.updateBillStatus(savedPayment.getBill().getId(), "Paid");
        }
        
        return savedPayment;
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payment> getPaymentsByBill(Bill bill) {
        return paymentRepository.findByBill(bill);
    }

    @Override
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    public Payment getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId);
    }

    @Override
    public void updatePaymentStatus(Long id, String status) {
        Payment payment = getPaymentById(id);
        if (payment != null) {
            payment.setStatus(status);
            paymentRepository.save(payment);
            
            // Update bill status if payment is successful
            if (status.equals("Success")) {
                billService.updateBillStatus(payment.getBill().getId(), "Paid");
            }
        }
    }

    @Override
    public String generateReceipt(Long paymentId) {
        Payment payment = getPaymentById(paymentId);
        if (payment != null && payment.getStatus().equals("Success")) {
            // Generate receipt URL or content
            String receiptUrl = "/receipts/" + payment.getTransactionId() + ".pdf";
            payment.setReceiptUrl(receiptUrl);
            paymentRepository.save(payment);
            return receiptUrl;
        }
        return null;
    }

    private String generateTransactionId() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }
} 