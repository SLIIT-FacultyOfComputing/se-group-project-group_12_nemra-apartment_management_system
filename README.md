NEMRA Smart Apartment Management System

// Overview

NEMRA Smart Apartment Management System is a comprehensive digital solution designed to enhance residential living experiences through smart, user-centered solutions. This system streamlines apartment management processes, facilitates communication between residents and administrators, and provides a seamless experience for handling day-to-day apartment-related tasks.

Small and Medium Enterprises (SMEs) play a vital role in Sri Lanka's economy by driving innovation, creating employment, and supporting community development. The NEMRA project aims to contribute to this ecosystem by providing an efficient management solution for residential complexes.

// Features

User Authentication & Management
- Secure login and registration system
- Role-based access control (Admin and Resident)
- Profile management
- Password recovery functionality

Admin Dashboard
- Resident management
- Bill generation and tracking
- Complaint management and resolution
- Notice creation and distribution
- Maintenance request handling

Resident Dashboard
- Personal information management
- Bill payment and history
- Complaint submission and tracking
- Access to community notices
- Marketplace for buying/selling items

Core Functionalities
- Billing System: Manage and pay electricity and water bills
- Complaint Management: Submit, track, and resolve maintenance issues
- Notice Board: Centralized communication for important announcements
- Marketplace: Platform for residents to buy and sell items
- Maintenance Requests: System for reporting and tracking maintenance needs
- Parking Reservations: Manage parking spaces within the complex
- Community Page: Social interaction platform for residents

// Technology Stack

Frontend
- Next.js (React framework)
- TypeScript
- Styled Components
- Lucide React (for icons)
- Java (for specific frontend components and logic)

Backend
- Spring Boot (Java)
- PostgreSQL Database
- JWT Authentication
- RESTful API Architecture

// Design Principles

The NEMRA Smart Apartment Management System is built on several key design principles:

1. User-Centered Design
- Intuitive interfaces designed with the end-user in mind
- Accessibility considerations for diverse user groups
- Responsive design for seamless experience across devices

2. Microservices Architecture
- Modular components that can be developed and scaled independently
- Service isolation for improved maintainability and fault tolerance
- API-driven communication between services

3. Domain-Driven Design (DDD)
- Business domain concepts reflected in code structure
- Bounded contexts to separate different functional areas
- Ubiquitous language shared between developers and stakeholders

4. SOLID Principles
- Single Responsibility: Each class has one responsibility
- Open/Closed: Open for extension, closed for modification
- Liskov Substitution: Subtypes must be substitutable for their base types
- Interface Segregation: Clients shouldn't depend on interfaces they don't use
- Dependency Inversion: Depend on abstractions, not concretions

5. Responsive and Progressive Design
- Progressive enhancement for better performance
- Graceful degradation for older browsers

6. Security by Design
- Authentication and authorization at all levels
- Data encryption in transit and at rest
- Input validation and sanitization
- Protection against common vulnerabilities

// Installation

Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Java Development Kit (JDK) 11 or higher
- PostgreSQL

// Frontend Setup
1. Clone the repository

    Git clone - https://github.com/SLIIT-FacultyOfComputing/se-group-project-group_12_nemra-apartment_management_system.git
 
2. Install dependencies
  
   npm install
   or
   yarn install
 
3. Start the development server
 
   npm run dev
   or
   yarn dev
  

// Backend Setup
1. Navigate to the backend directory
  
   cd backend

2. Configure the database connection 

    Apartment-Management-System/backend/src/main/resources/application.properties
   
3. Build and run the Spring Boot application
   
   ./mvnw spring-boot:run
  

// Deployment
Deployed on Amazon Web Services - Cloud computing company

Link - 

// Contributing

1. Fork the repository
2. Created 4 branches for members: Branch1 - Nadil, Branch2 - Yushri, Branch3 - SURAWEERA, Branch4 - RATHNAYAKA
3. Committed every change.
4. Push to the branch.
5. Submit a pull request and merge with the main.

// About NEMRA

NEMRA Smart Apartment Management System is designed to revolutionize residential living by providing a comprehensive digital solution for apartment management. By focusing on both functionality and usability, NEMRA aims to enhance the quality of life for residents while simplifying administrative tasks for property managers.

The system is built with scalability in mind, allowing it to be adapted for various sizes of residential complexes, from small apartment buildings to large gated communities. The modular architecture enables easy customisation and extension of features to meet specific requirements.

// Help

For inquiries or support, please contact:
SLIIT / Computer Science / Group 12 / IT23161788 - GAMAGE N.D , IT23194526 - YUSHRI AHAMED M L , IT23231528 - RATHNAYAKA R M C S , IT23225600 - SURAWEERA C M .

 
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PNXcjgcR)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18536165)
