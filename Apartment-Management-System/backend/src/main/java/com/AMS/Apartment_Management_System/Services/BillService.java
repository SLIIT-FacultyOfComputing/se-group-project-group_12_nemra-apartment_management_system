package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.entities.User;

import java.util.List;

public interface BillService {
    Bill createBill(Bill bill);
    Bill updateBill(Bill bill);
    void deleteBill(Long id);
    Bill getBillById(Long id);
    List<Bill> getAllBills();
    List<Bill> getBillsByUser(User user);
    List<Bill> getBillsByStatus(String status);
    List<Bill> getBillsByType(String type);
    List<Bill> getOverdueBills();
    void updateBillStatus(Long id, String status);
} 