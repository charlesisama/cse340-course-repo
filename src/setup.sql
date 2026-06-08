

-- ==========================================
-- ORGANIZATIONS TABLE
-- ==========================================

CREATE TABLE organizations (
organization_id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations
(name, description, contact_email, logo_filename)
VALUES
(
'BrightFuture',
'A nonprofit focused on improving community infrastructure through sustainable construction projects',
'[info@brightfuturebuilders.org](mailto:info@brightfuturebuilders.org)',
'brightfuture-logo.png'
),
(
'GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'[contact@greenharvest.org](mailto:contact@greenharvest.org)',
'greenharvest-logo.png'
),
(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives',
'[hello@unityserve.org](mailto:hello@unityserve.org)',
'unityserve-logo.png'
);

-- ==========================================
-- SERVICE PROJECTS TABLE
-- ==========================================

CREATE TABLE service_projects (
project_id SERIAL PRIMARY KEY,
organization_id INTEGER NOT NULL
    REFERENCES organizations(organization_id)
    ON DELETE CASCADE,

title VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(100) NOT NULL,
project_date DATE NOT NULL
);

-- ==========================================
-- SERVICE PROJECTS DATA
-- ==========================================

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES

-- Organization 1
(1, 'Food Relief Drive',
'Distributed food supplies to vulnerable families.',
'Lagos',
'2026-05-01'),

(1, 'Medical Outreach',
'Free health checks and consultations for residents.',
'Abuja',
'2026-05-05'),

(1, 'School Supply Donation',
'Provided educational materials to children.',
'Kano',
'2026-05-08'),

(1, 'Flood Relief Support',
'Emergency support for flood victims.',
'Benin City',
'2026-05-12'),

(1, 'Community Sanitation',
'Organized neighborhood environmental cleanup.',
'Ibadan',
'2026-05-15'),

-- Organization 2
(2, 'Youth Skills Workshop',
'Training youths in digital and vocational skills.',
'Port Harcourt',
'2026-05-03'),

(2, 'Clean Water Campaign',
'Installed water purification systems.',
'Kaduna',
'2026-05-06'),

(2, 'Girls Education Program',
'Promoted education awareness for girls.',
'Jos',
'2026-05-09'),

(2, 'Nutrition Awareness',
'Community nutrition education program.',
'Enugu',
'2026-05-14'),

(2, 'Volunteer Recruitment Fair',
'Recruited volunteers for upcoming projects.',
'Ilorin',
'2026-05-18'),

-- Organization 3
(3, 'Community Food Outreach',
'Distributed food packages to struggling families.',
'Lagos',
'2026-05-10'),

(3, 'Youth Volunteer Training',
'Leadership and volunteer training for students.',
'Abuja',
'2026-05-15'),

(3, 'Elderly Care Support',
'Visited elderly homes with welfare support.',
'Ibadan',
'2026-05-18'),

(3, 'Neighborhood Cleanup Campaign',
'Environmental sanitation and cleanup exercise.',
'Port Harcourt',
'2026-05-22'),

(3, 'School Mentorship Program',
'Career mentorship for secondary school students.',
'Enugu',
'2026-05-28');

-- ==========================================
-- CATEGORIES TABLE
-- ==========================================

CREATE TABLE categories (
category_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categories (name)
VALUES
('Environmental'),
('Education'),
('Health'),
('Community Service'),
('Youth Development'),
('Food Relief');

-- ==========================================
-- JUNCTION TABLE
-- MANY-TO-MANY RELATIONSHIP
-- ==========================================

CREATE TABLE projects_categories (
project_id INTEGER NOT NULL,
category_id INTEGER NOT NULL,

PRIMARY KEY (project_id, category_id),

CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES service_projects(project_id)
    ON DELETE CASCADE,

CONSTRAINT fk_category
    FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
    ON DELETE CASCADE

);

-- ==========================================
-- PROJECT CATEGORY MAPPINGS
-- ==========================================

INSERT INTO projects_categories
(project_id, category_id)
VALUES

-- Food Relief / Community
(1, 6),
(1, 4),

-- Medical Outreach
(2, 3),
(2, 4),

-- School Supply Donation
(3, 2),

-- Flood Relief Support
(4, 4),

-- Community Sanitation
(5, 1),

-- Youth Skills Workshop
(6, 5),
(6, 2),

-- Clean Water Campaign
(7, 1),

-- Girls Education Program
(8, 2),

-- Nutrition Awareness
(9, 3),

-- Volunteer Recruitment Fair
(10, 4),

-- Community Food Outreach
(11, 6),

-- Youth Volunteer Training
(12, 5),

-- Elderly Care Support
(13, 4),

-- Neighborhood Cleanup Campaign
(14, 1),

-- School Mentorship Program
(15, 2),
(15, 5);

INSERT INTO organizations
(name, description, contact_email, logo_filename)
VALUES
(
    'The Lord''s Hand NGO',
    'A faith-based nonprofit organization dedicated to humanitarian outreach, community development, education support, and welfare services for vulnerable populations.',
    'contact@thelordshand.org',
    'thelords-hand-logo.png'
);

-- ==========================================
-- THE LORD'S HAND NGO SERVICE PROJECTS
-- organization_id = 4
-- ==========================================

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES

(
4,
'Laptop Scholarship Program',
'Provided laptops and digital learning support to outstanding students with financial need to improve access to technology and academic success.',
'Lagos',
'2026-06-10'
),

(
4,
'Digital Skills Training Workshop',
'Conducted hands-on digital literacy and computer skills training for students to improve productivity and employability.',
'Abuja',
'2026-06-18'
),

(
4,
'Student Tech Mentorship Program',
'Connected university and secondary school students with mentors for guidance in software, technology, and career development.',
'Port Harcourt',
'2026-06-22'
),

(
4,
'Campus Innovation Scholarship Drive',
'Supported innovative student projects by providing laptop grants and academic support resources.',
'Enugu',
'2026-06-28'
),

(
4,
'Back-to-School Digital Support Initiative',
'Distributed learning devices and educational resources to underprivileged students preparing for a new academic session.',
'Kaduna',
'2026-07-05'
);


INSERT INTO project_categories
(project_id, category_id)
VALUES

-- Laptop Scholarship Program
(16, 2),
(16, 5),

-- Digital Skills Training Workshop
(17, 2),
(17, 5),

-- Student Tech Mentorship Program
(18, 2),
(18, 5),

-- Campus Innovation Scholarship Drive
(19, 2),

-- Back-to-School Digital Support Initiative
(20, 2),
(20, 4);



//Creating roles
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- PROJECT VOLUNTEERS
-- MANY TO MANY
-- ==========================================

CREATE TABLE project_volunteers (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,

    PRIMARY KEY (user_id, project_id),

    CONSTRAINT fk_volunteer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_volunteer_project
        FOREIGN KEY (project_id)
        REFERENCES service_projects(project_id)
        ON DELETE CASCADE
);


