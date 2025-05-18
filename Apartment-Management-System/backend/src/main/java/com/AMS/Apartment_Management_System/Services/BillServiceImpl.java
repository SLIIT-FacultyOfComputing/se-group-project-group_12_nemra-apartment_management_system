package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.entities.User;
import com.AMS.Apartment_Management_System.repositories.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public Bill createBill(Bill bill) {
        bill.setStatus("Pending");
        return billRepository.save(bill);
    }

    @Override
    public Bill updateBill(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }

    @Override
    public Bill getBillById(Long id) {
        return billRepository.findById(id).orElse(null);
    }

    @Override
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    @Override
    public List<Bill> getBillsByUser(User user) {
        return billRepository.findByUser(user);
    }

    @Override
    public List<Bill> getBillsByStatus(String status) {
        return billRepository.findByStatus(status);
    }

    @Override
    public List<Bill> getBillsByType(String type) {
        return billRepository.findByTypeAndStatus(type, "Pending");
    }

    @Override
    public List<Bill> getOverdueBills() {
        return billRepository.findByDueDateBeforeAndStatus(LocalDate.now(), "Pending");
    }

    @Override
    public void updateBillStatus(Long id, String status) {
        Bill bill = getBillById(id);
        if (bill != null) {
            bill.setStatus(status);
            if (status.equals("Paid")) {
                bill.setPaidDate(LocalDate.now());
            }
            billRepository.save(bill);
        }
    }
} 