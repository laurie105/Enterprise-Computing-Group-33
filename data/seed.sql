-- Fictional seed data for Campus Companion (Group 33)
-- All names, events, and details are entirely fictional

-- TIMETABLE
CREATE TABLE IF NOT EXISTS timetable (
  id SERIAL PRIMARY KEY,
  module_code TEXT NOT NULL,
  module_name TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  room TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  course TEXT NOT NULL
);

INSERT INTO timetable (module_code, module_name, day_of_week, start_time, end_time, room, lecturer, course) VALUES
('CS1001', 'Introduction to Programming', 'Monday', '09:00', '11:00', 'B201', 'Dr. Fiona Hartley', 'Computing General'),
('CS1002', 'Computer Architecture', 'Monday', '13:00', '15:00', 'A104', 'Mr. Declan Murphy', 'Computing General'),
('MATH1001', 'Discrete Mathematics', 'Tuesday', '10:00', '12:00', 'C302', 'Dr. Aoife Brennan', 'Computing General'),
('CS1003', 'Web Development Fundamentals', 'Tuesday', '14:00', '16:00', 'Lab3', 'Ms. Sarah O''Brien', 'Computing General'),
('CS1004', 'Database Systems', 'Wednesday', '09:00', '11:00', 'B205', 'Mr. Cian Walsh', 'Computing General'),
('STAT1001', 'Statistics for Computing', 'Wednesday', '13:00', '15:00', 'A101', 'Dr. Fiona Hartley', 'Computing General'),
('CS1005', 'Operating Systems', 'Thursday', '10:00', '12:00', 'B201', 'Mr. Declan Murphy', 'Computing General'),
('CS1006', 'Nature of Enterprise Computing', 'Thursday', '14:00', '16:00', 'Lab2', 'Ms. Sarah O''Brien', 'Computing General'),
('CS1001', 'Introduction to Programming (Lab)', 'Friday', '09:00', '11:00', 'Lab1', 'Ms. Sarah O''Brien', 'Computing General'),
('MATH1001', 'Discrete Mathematics (Tutorial)', 'Friday', '13:00', '14:00', 'C302', 'Dr. Aoife Brennan', 'Computing General');

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  organiser TEXT NOT NULL,
  capacity INT,
  attendees INT DEFAULT 0,
  tags TEXT[]
);

INSERT INTO events (title, description, date, start_time, end_time, location, category, organiser, capacity, attendees, tags) VALUES
('Freshers Week Welcome Talk', 'An introduction to TUD services, clubs, and supports for new students.', '2025-09-08', '10:00', '12:00', 'Main Hall, Block A', 'Academic', 'Student Services', 300, 245, ARRAY['freshers','welcome','orientation']),
('Coding Hackathon 2025', '24-hour hackathon open to all computing students. Form teams and build something amazing!', '2025-10-15', '09:00', '09:00', 'Computer Lab Block B', 'Society', 'Computing Society', 60, 58, ARRAY['hackathon','coding','computing']),
('Mental Health Awareness Week Seminar', 'Expert panel on student mental wellbeing and available supports.', '2025-10-20', '13:00', '15:00', 'Lecture Hall C1', 'Wellbeing', 'Student Union', 150, 87, ARRAY['wellness','mental-health','support']),
('Campus Art Exhibition', 'Showcase of student artwork across all disciplines.', '2025-11-03', '11:00', '17:00', 'Atrium, Block D', 'Culture', 'Arts Society', 200, 130, ARRAY['art','culture','exhibition']),
('CV Writing Workshop', 'Get tips from industry professionals on crafting the perfect CV.', '2025-11-10', '14:00', '16:00', 'Room A203', 'Career', 'Careers Office', 40, 39, ARRAY['career','cv','workshop']),
('Table Quiz Night', 'Annual charity table quiz. Teams of 4, €5 per person.', '2025-11-17', '19:00', '22:00', 'Student Bar', 'Social', 'Student Union', 120, 96, ARRAY['social','quiz','charity']),
('Data Science Guest Lecture', 'Industry guest from a Dublin tech firm talks about data pipelines.', '2025-11-24', '12:00', '13:00', 'Lecture Hall B2', 'Academic', 'Computing Society', 80, 54, ARRAY['data','lecture','computing']),
('Sports Day 2025', 'Inter-class sports competition. Sign up your team at the SU office.', '2025-12-01', '10:00', '16:00', 'Sports Ground', 'Sport', 'Sports Society', 200, 177, ARRAY['sport','fitness','competition']),
('Christmas Social', 'End of semester social with live music and food.', '2025-12-12', '18:00', '23:00', 'Student Bar & Courtyard', 'Social', 'Student Union', 250, 210, ARRAY['social','christmas','music']),
('Spring Semester Orientation', 'Welcome back session for all returning students.', '2026-01-19', '10:00', '12:00', 'Main Hall, Block A', 'Academic', 'Student Services', 300, 180, ARRAY['orientation','semester','returning']);

-- CANTEEN MENU
CREATE TABLE IF NOT EXISTS canteen_menu (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(5,2) NOT NULL,
  category TEXT NOT NULL,
  calories INT,
  available_days TEXT[],
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  allergens TEXT[]
);

INSERT INTO canteen_menu (item_name, description, price, category, calories, available_days, is_vegetarian, is_vegan, allergens) VALUES
('Grilled Chicken Wrap', 'Grilled chicken, mixed leaves, tomato, mayo in a flour tortilla', 6.50, 'Mains', 520, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], false, false, ARRAY['gluten','egg']),
('Vegetable Curry & Rice', 'Mild vegetable curry served with steamed basmati rice', 5.80, 'Mains', 480, ARRAY['Monday','Wednesday','Friday'], true, true, ARRAY['celery']),
('Beef Lasagne', 'Classic beef lasagne with garlic bread', 6.90, 'Mains', 650, ARRAY['Tuesday','Thursday'], false, false, ARRAY['gluten','dairy','egg']),
('Soup of the Day', 'Homemade soup served with a bread roll', 3.50, 'Starters', 220, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, false, ARRAY['gluten','dairy']),
('Caesar Salad', 'Romaine lettuce, croutons, parmesan, Caesar dressing', 5.20, 'Salads', 310, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, false, ARRAY['gluten','dairy','egg','fish']),
('Chips', 'Crispy salted chips', 2.50, 'Sides', 380, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, true, ARRAY[]),
('Americano', 'Double shot espresso with hot water', 2.80, 'Hot Drinks', 10, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, true, ARRAY[]),
('Cappuccino', 'Espresso topped with steamed milk foam', 3.20, 'Hot Drinks', 90, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, false, ARRAY['dairy']),
('Orange Juice', 'Freshly squeezed orange juice (250ml)', 2.20, 'Cold Drinks', 115, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, true, ARRAY[]),
('Chocolate Brownie', 'Warm chocolate brownie with cream', 2.80, 'Desserts', 380, ARRAY['Monday','Wednesday','Friday'], true, false, ARRAY['gluten','dairy','egg','nuts']),
('Vegan Falafel Wrap', 'Falafel, hummus, cucumber, red onion in a wholemeal wrap', 6.20, 'Mains', 490, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], true, true, ARRAY['gluten','sesame']),
('Toasted Panini', 'Cheese and ham toasted panini', 4.50, 'Snacks', 420, ARRAY['Monday','Tuesday','Wednesday','Thursday','Friday'], false, false, ARRAY['gluten','dairy']);

-- LOST AND FOUND
CREATE TABLE IF NOT EXISTS lost_found (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  description TEXT,
  date_reported DATE NOT NULL,
  location_found TEXT,
  status TEXT DEFAULT 'unclaimed',
  contact_email TEXT,
  image_url TEXT
);

INSERT INTO lost_found (item_name, description, date_reported, location_found, status, contact_email) VALUES
('Black Laptop Bag', 'Black Nike laptop bag with a yellow keyring. Contains charger.', '2025-10-14', 'Library, 2nd Floor', 'unclaimed', 'reception@tud-fictional.ie'),
('Student ID Card', 'TUD student card for a student in the Computing faculty.', '2025-10-16', 'Canteen', 'unclaimed', 'reception@tud-fictional.ie'),
('Blue Water Bottle', 'Hydroflask blue water bottle with stickers on it.', '2025-10-18', 'Sports Hall', 'claimed', 'reception@tud-fictional.ie'),
('Glasses Case', 'Brown leather glasses case, empty.', '2025-10-20', 'Block A Corridor', 'unclaimed', 'reception@tud-fictional.ie'),
('Scientific Calculator', 'Casio fx-85GT, name written inside lid.', '2025-10-21', 'Maths Lecture Hall C3', 'unclaimed', 'reception@tud-fictional.ie'),
('Umbrella', 'Black folding umbrella.', '2025-10-22', 'Main Reception', 'unclaimed', 'reception@tud-fictional.ie'),
('Airpods Case', 'White AirPods case, no earbuds inside.', '2025-10-23', 'Library Ground Floor', 'unclaimed', 'reception@tud-fictional.ie'),
('Green Hoodie', 'Green college hoodie, size M.', '2025-10-24', 'Gym Changing Room', 'claimed', 'reception@tud-fictional.ie');

-- HELPDESK TICKETS
CREATE TABLE IF NOT EXISTS helpdesk_tickets (
  id SERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_number TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample tickets (fictional)
INSERT INTO helpdesk_tickets (student_name, student_number, email, category, subject, description, status, priority) VALUES
('Liam Connolly', 'C00112233', 'liam.c@fictional-tud.ie', 'IT Support', 'Cannot access Moodle', 'I get a login error when trying to access Moodle since yesterday morning.', 'in-progress', 'high'),
('Niamh Fitzgerald', 'C00112234', 'niamh.f@fictional-tud.ie', 'Library', 'Book reservation not showing', 'I reserved a book last week but it is not appearing in my account.', 'open', 'medium'),
('Cormac Ryan', 'C00112235', 'cormac.r@fictional-tud.ie', 'Finance', 'Grant payment query', 'My SUSI grant has not been reflected in my fees account.', 'resolved', 'high'),
('Aoife Kelly', 'C00112236', 'aoife.k@fictional-tud.ie', 'Academic', 'Timetable clash', 'My timetable shows two modules at the same time on Thursday.', 'open', 'medium'),
('Sean Burke', 'C00112237', 'sean.b@fictional-tud.ie', 'IT Support', 'Wi-Fi access issue', 'The eduroam Wi-Fi keeps disconnecting in Block B.', 'in-progress', 'low');

-- CAMPUS LOCATIONS
CREATE TABLE IF NOT EXISTS campus_locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  building TEXT,
  floor TEXT,
  opening_hours TEXT,
  phone TEXT,
  email TEXT
);

INSERT INTO campus_locations (name, category, description, building, floor, opening_hours, phone, email) VALUES
('Main Library', 'Academic', 'Full library service with study spaces, printing, and borrowing.', 'Block C', 'Ground & 1st', 'Mon-Fri 08:30-21:00, Sat 10:00-17:00', '01-555-0101', 'library@fictional-tud.ie'),
('Student Union Office', 'Student Services', 'SU rep office, welfare support, event bookings.', 'Block A', 'Ground Floor', 'Mon-Fri 09:00-17:00', '01-555-0102', 'su@fictional-tud.ie'),
('Careers Office', 'Student Services', 'CV help, job listings, industry placement support.', 'Block B', '2nd Floor', 'Mon-Fri 09:30-16:30', '01-555-0103', 'careers@fictional-tud.ie'),
('Canteen', 'Food & Drink', 'Main campus canteen serving hot meals, snacks, and drinks.', 'Block D', 'Ground Floor', 'Mon-Fri 08:00-16:00', '01-555-0104', 'canteen@fictional-tud.ie'),
('IT Helpdesk', 'IT Support', 'Walk-in IT support for students and staff.', 'Block B', 'Ground Floor', 'Mon-Fri 09:00-17:30', '01-555-0105', 'ithelpdesk@fictional-tud.ie'),
('Gym & Sports Hall', 'Sport', 'Fully equipped gym and sports hall. Membership required.', 'Block E', 'Ground Floor', 'Mon-Fri 07:00-22:00, Sat-Sun 09:00-18:00', '01-555-0106', 'sport@fictional-tud.ie'),
('Disability Support Office', 'Student Services', 'Supports students with disabilities and learning differences.', 'Block A', '1st Floor', 'Mon-Fri 09:00-17:00', '01-555-0107', 'disability@fictional-tud.ie'),
('Health Centre', 'Wellbeing', 'On-campus nurse and counselling service.', 'Block A', 'Ground Floor', 'Mon-Fri 09:00-17:00', '01-555-0108', 'health@fictional-tud.ie'),
('Printing Services', 'Academic', 'Print, scan, and photocopy. Student card payment only.', 'Block C', 'Ground Floor', 'Mon-Fri 08:30-18:00', '01-555-0109', 'print@fictional-tud.ie'),
('Main Reception', 'Admin', 'General enquiries, lost & found, visitor passes.', 'Block A', 'Ground Floor', 'Mon-Fri 08:00-18:00', '01-555-0110', 'reception@fictional-tud.ie');
