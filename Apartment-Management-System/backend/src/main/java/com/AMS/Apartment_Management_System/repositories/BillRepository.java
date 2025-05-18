package com.AMS.Apartment_Management_System.repositories;

import com.AMS.Apartment_Management_System.entities.Bill;
import com.AMS.Apartment_Management_System.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUser(User user);
    List<Bill> findByUserAndStatus(User user, String status);
    List<Bill> findByStatus(String status);
    List<Bill> findByDueDateBeforeAndStatus(LocalDate date, String status);
    List<Bill> findByTypeAndStatus(String type, String status);
} 