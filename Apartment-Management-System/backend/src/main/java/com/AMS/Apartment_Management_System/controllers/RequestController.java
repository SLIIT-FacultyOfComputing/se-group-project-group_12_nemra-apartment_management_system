package com.AMS.Apartment_Management_System.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AMS.Apartment_Management_System.Services.RequestService;
import com.AMS.Apartment_Management_System.entities.Request;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping("/submit")
    public Request submitRequest(@RequestBody Request request) {
        return requestService.saveRequest(request);
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public Optional<Request> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

    @PutMapping("/{id}/status")
    public Request updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        return requestService.updateStatus(id, status);
    }

    @PutMapping("/{id}/admin-respond")
    public Request adminRespondToRequest(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String adminResponse = body.get("adminResponse");
        return requestService.adminRespond(id, status, adminResponse);
    }
}