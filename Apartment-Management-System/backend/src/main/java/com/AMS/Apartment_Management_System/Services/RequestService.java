package com.AMS.Apartment_Management_System.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AMS.Apartment_Management_System.entities.Request;
import com.AMS.Apartment_Management_System.repositories.RequestRepository;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public Request saveRequest(Request request) {
        request.setStatus("Pending"); // Default status
        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Request updateStatus(Long id, String status) {
        Optional<Request> optionalRequest = requestRepository.findById(id);
        if (optionalRequest.isPresent()) {
            Request request = optionalRequest.get();
            request.setStatus(status);
            return requestRepository.save(request);
        }
        return null;
    }
}