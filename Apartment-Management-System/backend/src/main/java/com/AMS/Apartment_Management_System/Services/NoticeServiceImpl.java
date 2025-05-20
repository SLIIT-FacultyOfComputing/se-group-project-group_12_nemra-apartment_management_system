package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Notice;
import com.AMS.Apartment_Management_System.repositories.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice updateNotice(Long id, Notice updated) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setSubject(updated.getSubject());
            notice.setContent(updated.getContent());
            return noticeRepository.save(notice);
        }).orElse(null);
    }

    @Override
    public boolean deleteNotice(Long id) {
        if (noticeRepository.existsById(id)) {
            noticeRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 