-- ==============================================================================
-- NATIONAL CAKE CMS SEED DATA
-- Pre-populates all existing site records into Supabase
-- ==============================================================================

-- Clear any existing rows to prevent duplicate entries if re-run
TRUNCATE TABLE gallery, faqs, events, testimonials, authority_presentations, mentions RESTART IDENTITY CASCADE;

-- 1. SEED GALLERY ITEMS (58 Items)
INSERT INTO gallery (id, image, category, tags, display_order) VALUES
(1, '/NCLU12.jpg', 'Education', ARRAY['Teaching', 'Students', 'History', 'Education'], 1),
(2, '/DSC92.jpg', 'Education', ARRAY['Citizenship', 'Civic Education', 'Responsibility', 'Learning'], 2),
(3, '/DSC95.jpg', 'Education', ARRAY['History', 'Learning', 'Discovery', 'Heritage'], 3),
(4, '/DSC98.jpg', 'Community', ARRAY['Family', 'Unity', 'Learning', 'Bonding'], 4),
(5, '/DSC101.jpg', 'Gameplay', ARRAY['Discovery', 'Excitement', 'History', 'Engagement'], 5),
(6, '/DSC102.jpg', 'Gameplay', ARRAY['Participation', 'Engagement', 'Interactive', 'Learning'], 6),
(7, '/DSC103.jpg', 'Community', ARRAY['Pride', 'Youth', 'Patriotism', 'Identity'], 7),
(8, '/DSC104.jpg', 'Education', ARRAY['Collaboration', 'Teamwork', 'Students', 'Education'], 8),
(9, '/DSC106.jpg', 'Gameplay', ARRAY['Focus', 'Strategy', 'Thinking', 'Learning'], 9),
(10, '/DSC107.jpg', 'Community', ARRAY['Generations', 'Stories', 'Unity', 'Heritage'], 10),
(11, '/DSC110.jpg', 'Game Setup', ARRAY['Setup', 'Excitement', 'Preparation', 'Anticipation'], 11),
(12, '/DSC111.jpg', 'Community', ARRAY['Strategy', 'Future', 'Teamwork', 'Nation Building'], 12),
(13, '/DSC114.jpg', 'Education', ARRAY['Discussion', 'Leadership', 'Governance', 'Critical Thinking'], 13),
(14, '/DSC115.jpg', 'Education', ARRAY['History', 'Reflection', 'Learning', 'Awareness'], 14),
(15, '/DSC119.jpg', 'Community', ARRAY['Future', 'Vision', 'Hope', 'Solutions'], 15),
(16, '/DSC123.jpg', 'Community', ARRAY['Unity', 'Diversity', 'Understanding', 'Community'], 16),
(17, '/NATIONAL_CAKE_CHAMPIONSHIP_4_.jpg', 'Events', ARRAY['Championship', 'Tournament', 'Competition', 'Events'], 17),
(18, '/NCUPDATE-2.jpeg', 'Education', ARRAY['Youth', 'Education', 'Gameplay', 'Community'], 18),
(19, '/NCUPDATE-3.jpeg', 'Community', ARRAY['Community', 'Gameplay', 'Engagement', 'Unity'], 19),
(20, '/NCUPDATE-4.jpeg', 'Gameplay', ARRAY['Gameplay', 'Learning', 'Events', 'Impact'], 20),
(21, '/NCUPDATE-5.jpeg', 'Events', ARRAY['Outreach', 'Events', 'Brand', 'Community'], 21),
(22, '/NCUPDATE-6.jpeg', 'Education', ARRAY['Education', 'History', 'Interactive', 'Learning'], 22),
(23, '/NCUPDATE-7.jpeg', 'Community', ARRAY['Unity', 'Dialogue', 'Community', 'Nation Building'], 23),
(24, '/NCUPDATE-8.jpeg', 'Events', ARRAY['Showcase', 'Events', 'Families', 'Outreach'], 24),
(25, '/NCUPDATE-9.jpeg', 'Education', ARRAY['Civic Education', 'Participation', 'Learning', 'Engagement'], 25),
(26, '/NCUPDATE-10.jpeg', 'Education', ARRAY['Workshop', 'Facilitation', 'Education', 'Impact'], 26),
(27, '/NCUPDATE-11.jpeg', 'Community', ARRAY['Community', 'Growth', 'Discovery', 'Movement'], 27),
(28, '/NCUPDATE-12.jpeg', 'Gameplay', ARRAY['Game Night', 'Fun', 'Strategy', 'Patriotism'], 28),
(29, '/NCUPDATE-13.jpeg', 'Education', ARRAY['Institutions', 'Partnership', 'Education', 'Impact'], 29),
(30, '/NCUPDATE-14.jpeg', 'Events', ARRAY['Demo', 'Events', 'Awareness', 'Engagement'], 30),
(31, '/NCUPDATE-15.jpeg', 'Community', ARRAY['Youth', 'Leadership', 'Critical Thinking', 'Future'], 31),
(32, '/NCUPDATE-16.jpeg', 'Events', ARRAY['Outreach', 'Expansion', 'Movement', 'Events'], 32),
(33, '/NCUPDATE-17.jpeg', 'Gameplay', ARRAY['Teamwork', 'Collaboration', 'Debate', 'Governance'], 33),
(34, '/NCUPDATE-18.jpeg', 'Community', ARRAY['Culture', 'Heritage', 'Celebration', 'Identity'], 34),
(35, '/NCUPDATE-19.jpeg', 'Education', ARRAY['Schools', 'Students', 'Education', 'Civic Learning'], 35),
(37, '/NCUPDATE-21.jpeg', 'Community', ARRAY['Inspiration', 'New Players', 'Joy', 'Movement'], 37),
(38, '/NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE.jpg', 'Events', ARRAY['Presentation', 'Events', 'Authority', 'Partnership'], 38),
(39, '/NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN.jpg', 'Events', ARRAY['Presentation', 'Events', 'Authority', 'Government'], 39),
(40, '/NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL.jpg', 'Events', ARRAY['Presentation', 'Events', 'Festival', 'Authority'], 40),
(41, '/NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA.jpg', 'Events', ARRAY['Presentation', 'Events', 'Authority', 'Culture'], 41),
(42, '/NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025.jpg', 'Events', ARRAY['Presentation', 'Events', 'Authority'], 42),
(43, '/NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT.jpg', 'Events', ARRAY['Presentation', 'Events', 'Government', 'Authority'], 43),
(44, '/NATIONAL_CAKE_CHAMPIONSHIP_1_.jpg', 'Events', ARRAY['Championship', 'Tournament', 'Competition', 'Events'], 44),
(45, '/NATIONAL_CAKE_CHAMPIONSHIP_2_.jpg', 'Events', ARRAY['Championship', 'Tournament', 'Competition', 'Events'], 45),
(46, '/NATIONAL_CAKE_CHAMPIONSHIP_3_.jpg', 'Events', ARRAY['Championship', 'Tournament', 'Competition', 'Events'], 46),
(47, '/NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_1_.jpg', 'Events', ARRAY['Championship', 'Tournament', 'Community', 'Events'], 47),
(48, '/NATIONAL_CAKE_BEETA_ARTS_FESTIVAL_2_.jpg', 'Events', ARRAY['Festival', 'Culture', 'Events', 'Exhibition'], 48),
(49, '/NATIONAL_CAKE_BEETA_ARTS_FESTIVAL_3_.jpg', 'Events', ARRAY['Festival', 'Culture', 'Events', 'Exhibition'], 49),
(50, 'PROJECT_GIANT_GOVERNMENT_SCIENCE_SECONDARY_SCHOOL_MAITAMA_2_rvlf54', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 50),
(51, 'PROJECT_GIANT_GOVERNMENT_SCIENCE_SECONDARY_SCHOOL_MAITAMA_1_aw9xqj', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 51),
(52, 'NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_2_gcuks5', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 52),
(54, 'NATIONAL_CAKE_MINI_CHAMPIONSHIP_JABI_PARK_3_iijd3h', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 54),
(55, 'PROJECT_GIANT_2_toxmmw', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 55),
(56, 'PROJECT_GIANT_3_fllop1', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 56),
(57, 'PROJECT_GIANT_1_hbej7q', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 57),
(58, 'NCUPDATE-8.jpg', 'Events', ARRAY['Education', 'Schools', 'Events', 'Community'], 58)
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('gallery', 'id'), coalesce(max(id),0) + 1, false) FROM gallery;

-- 2. SEED FAQS (General, Agent, PreOrder)
INSERT INTO faqs (category, question, answer, list_items, display_order) VALUES
('general', 'Why is it called ''National Cake''?', 'It is a metaphor. In Nigeria, ''national cake'' refers to shared wealth, opportunity, and governance. This game reframes it into a conversation about responsibility, unity, and legacy.', '{}', 1),
('general', 'What makes National Cake unique compared to other games?', 'National Cake uniquely blends neuroscience-backed learning, authentic Nigerian narrative, historical depth and modular phases to create immersive transformation, making it a collectible and primary learning channel for Nigerianization.', '{}', 2),
('general', 'What age group is the game suitable for?', 'Ideal for ages 10+, though younger players can participate with guidance. It is designed to engage teens, adults and elders alike.', '{}', 3),
('general', 'What can schools, teachers, and educators gain from adopting this game?', 'It provides a fresh, experiential way to teach history, civic responsibility, and patriotism, while building empathy, critical thinking and collaborative skills.', '{}', 4),
('general', 'How much does a unit of National Cake cost?', 'The standard retail price is ₦55,000 per unit with free delivery within Nigeria. Special bulk pricing of ₦50,000 is available for schools, NGOs, government partners and organizations.', '{}', 5),
('general', 'Where can I buy the game?', 'Through our website, registered agents and authorized distributors. A digital store locator is available on the platform.', '{}', 6),
('general', 'How can I become a National Cake agent or distributor?', 'You can register via our website or mobile portal. There are different tiers (macro, state, regional) with specific benefits, commissions and responsibilities.', '{}', 7),
('general', 'Is there a fee to become an agent?', 'Yes. Each agent level has a non-refundable fee of N5,000 and starter order. Details are provided during onboarding.', '{}', 8),
('general', 'What support do agents get?', 'Training webinars, branded kits, sales resources, marketing materials and listing on website and promotional materials.', '{}', 9),
('general', 'Is there an online version of the game?', 'In progress and launching soon, but a digital companion platform (National Oven) exists for extended engagement and civic participation.', '{}', 10),

('agent', 'Who is a Macro Agent?', 'This is our strategic partner in National Building. Who manages sales within a city or LGA cluster, connecting schools, communities, and corporate buyers with National Cake? They serve under a State Distributor and can onboard grassroots agents.', '{}', 1),
('agent', 'What are the requirements to join?', 'Each distribution tier requires a non-refundable registration fee and an initial investment as follows', ARRAY['₦5,000 one-time yearly registration', 'Initial inventory order of at least 10–100 units', 'Monthly target commitment', 'Pre-boarding training completion'], 2),
('agent', 'What do I gain as a Macro Agent?', 'Here are the benefits of being a Macro Agent', ARRAY['₦2,500 commission per unit sold', 'Performance bonuses for top sellers', 'Priority access to expansion packs and new launches', 'Brand Co., marketing opportunities in your region', 'Recognition badges and advancement pathways', 'First access to regional events and activations', 'Agent toolkit (marketing materials)', 'Possibility of tier promotion to State Distributor level', 'Access to the NCC platform for community engagement and extra income streams'], 3),
('agent', 'Can I build a team beneath me?', 'Yes. Macro Agents can recruit Community Agents and earn override commissions. The more your network sells, the more you earn.', '{}', 4),
('agent', 'Do I get territorial rights?', 'Exclusive zones are not guaranteed, but consistent high-performers receive preferred zones and renewal priority.', '{}', 5),

('order', 'What age group is National Cake suitable for?', 'National Cake is ideal for ages 12 and above, including teens, young adults, and families. It''s great for schools, leadership programs, and community engagement.', '{}', 1),
('order', 'How many players can participate at once?', 'The game supports 2 to 4 players per session. It is perfect for group learning and civic discussions.', '{}', 2),
('order', 'What''s included in each box?', 'Each Renaissance Edition box contains:', ARRAY['1 The National Cake Book (Official Companion Guide & Civic Intelligence Manual)', '1 Official History Board Game', '1 Playbook & Storyteller Guide', '4 spin pads', '8 race counters', '40 bridge tokens', '1 game rules pamphlet', '1 Nigerian Emotional Map (NEM) brochure', 'Free Delivery within Nigeria'], 3),
('order', 'How long does shipping take after I order?', 'Orders are processed within 24–48 hours. Free delivery within Nigeria (delivered within 48 hours in Abuja, and nationwide express shipping).', '{}', 4),
('order', 'Is the game available outside Nigeria?', 'Yes, international orders and diaspora shipments (UK, US, Canada) are supported. For bulk international distribution, please contact our team.', '{}', 5),
('order', 'What if I receive a damaged or incomplete box?', 'We offer a 7-day replacement guarantee. Simply report the issue with a photo, and we''ll arrange a prompt replacement.', '{}', 6);

-- 3. SEED EVENTS & COMPETITIONS
INSERT INTO events (title, description, tag, icon, registration_link, button_text, display_order) VALUES
('National Cake Inter-College Competition', 'This is where Nigeria''s brightest young minds gather to test more than knowledge, they will test values, logic, and conscience. It promises to transform classrooms into arenas of critical thinking, teamwork, and patriotism.', 'College Competition', 'GraduationCap', 'https://forms.gle/Drof8mJixaV3HBEw5', 'Join Wait List', 1),
('National Cake Inter-Campus Competition', 'From lecture halls to civic halls, the National Inter-Campus Competition brings together universities, polytechnics and colleges of education in a fierce but reflective contest of intellect and identity.', 'Campus Competition', 'Users', 'https://forms.gle/pzicbVGsMJszZNRj9', 'Join Wait List', 2),
('National Cake Championship (NCC)', 'The National Cake Championship is the grand stage where champions from across schools, communities, and regions converge to play for more than a trophy. They play for meaning. They play for Nigeria.', 'National Championship', 'MapPin', 'https://forms.gle/25gfCDtR463i7ZSy5', 'Join Wait List', 3);

-- 4. SEED TESTIMONIALS
INSERT INTO testimonials (name, role, quote, image, rating, featured, display_order) VALUES
('Bem Pever', 'Creative Producer and Communication Expert', 'The layout is very impressive. It should be incorporated into film festivals and supplied to every university.', '/BEM-PEVER.jpeg', 5, true, 1),
('Princess Bunmi Pukat', 'Queen Mother of Nigerian Youths', 'National Cake is an unusual and educative game. It took me back to the old habit of studying in the library. Honestly, this is a laudable project. We are supposed to take it to picnics, buy it for our offices, have it in lounges, have it in homes for our children because it doesn''t need 100% supervision.', '/PRINCESS-BUNMI-PUKAT.jpeg', 5, true, 2),
('Ralph Ayua', 'Founder: Centre for Attitudinal Change', 'This is a brilliant idea that the Federal Ministry of Education should adopt. It can educate young people about Nigeria’s history, help reduce smartphone addiction, and promote meaningful engagement.', '/COACH-RALPH.jpeg', 5, true, 3),
('Dr. Hyeladi Haruna', 'Founder: Heladi Holdings', 'Every student must have to play this National Cake to pass their exams because it is very strategic. We are learning other people’s history, not our own. I like the idea; I have even benefitted by sitting here.', '/DR-HYELADI-HARUNA.jpg', 5, true, 4),
('Obinna CHUKWUEZIE', 'Communication die-hard & Founder, @JCMCentre', 'I realised that every move, every card drawn, challenges players to think, reflect, and propose solutions to a challenge in Nigeria. The game entertains, informs, and most importantly, stimulates critical thinking.', '/OBINNA-CHUKWUEZIE.jpg', 5, true, 5),
('Nancy Oblete', 'Founder: Panaceaville International', 'This is sophisticated. This is a massive concept. I love the “Experience Spot” because we cannot shy away from the bad experiences.', '/NANCY-OBLETE.jpg', 5, true, 6);

-- 5. SEED AUTHORITY PRESENTATIONS
INSERT INTO authority_presentations (title, dignitary_name, image, display_order) VALUES
('H.E Babatunde Raji Fashola CON, SAN', 'Babatunde Fashola', '/NATIONAL_CAKE_PRESENTATION_TO_H_E_BABATUNDE_RAJI_FASHOLA_CON_SAN.jpg', 1),
('Ali Baba', 'Ali Baba', '/NATIONAL_CAKE_PRESENTATION_TO_ALI_BABA.jpg', 2),
('Aisha Augie – DG of CBAAC', 'Aisha Augie', '/NATIONAL_CAKE_PRESENTATION_TO_AISHA_AUGIE_DG_OF_CBAAC_and_PEV_ABEM_OF_TAKE_7_MEDIA_BEETA_ARTS_FESTIVAL.jpg', 3),
('Maj. Gen. JGK Myam (rtd) – DG NARC', 'Maj. Gen. JGK Myam', '/NATIONAL_CAKE_PRESENTATION_TO_MAJ_GEN_JGK_MYAM_rtd_the_DG_of_NIGERIAN_ARMY_RESOURCE_CENTRE.jpg', 4),
('Pastor Sam Oye – AB CON 2025', 'Rev. Sam Oye', '/NATIONAL_CAKE_PRESENTATION_TO_PASTOR_SAM_OYE_AB_CON_2025.jpg', 5),
('Rt. Hon. Benjamin Kalu – Deputy Speaker', 'Deputy Speaker', '/NATIONAL_CAKE_PRESENTATION_TO_THE_DEPUTY_SPEAKER_RT_HON_BENJAMIN_KALU_ENTERPRISE_NEXUS_SUMMIT.jpg', 6);

-- 6. SEED PRESS MENTIONS
INSERT INTO mentions (outlet_name, article_url, logo_url, display_order) VALUES
('Punch News', 'https://punchng.com/coach-launches-board-game-to-spark-civic-rebirth/', 'punch', 1),
('This Day News', 'https://www.thisdaylive.com/2025/08/05/victor-prince-dickson-to-launch-national-cake-nigerias-civic-board-game-designed-to-heal-the-nation/', 'thisday', 2),
('Nigeria Times', 'https://nigeriatimes.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/', 'nigerian-times', 3),
('Daily Times Nigeria', 'https://dailytimesnigeria.com.ng/dickson-to-launch-national-cake-nigerias-civic-board-game/', 'daily-times', 4),
('National Gallery of Art', 'https://nga.gov.ng/gallery/#:~:text=The%20Guest%20Creative%20(in%20Brown)%2C,explanation%20on%20what%20the%20National', 'NGA-Logo', 5);
