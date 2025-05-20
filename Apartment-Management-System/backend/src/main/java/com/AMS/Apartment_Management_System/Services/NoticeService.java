package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.Notice;
import java.util.List;

public interface NoticeService {
    Notice saveNotice(Notice notice);
    List<Notice> getAllNotices();
    Notice updateNotice(Long id, Notice updated);
    boolean deleteNotice(Long id);
} 