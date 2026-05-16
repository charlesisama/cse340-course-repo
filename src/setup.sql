CREATE TABLE organization (
	organization_id SERIAL  PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization VALUES
	(default,'BrightFuture', 'A nonprofit focused on improving community infrastructure through sustainable construction projects', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	(default,'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	(default, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,

    organization_id INTEGER NOT NULL
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE,

    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    project_date DATE NOT NULL
);


INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
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
 '2026-05-15');

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
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
 '2026-05-18');

 INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
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