-- ==============================================================================
-- NATIONAL CAKE CONTENT MANAGEMENT SYSTEM (CMS)
-- Supabase Schema, Row Level Security (RLS) & Initial Seed Data
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- Table: Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  product_price NUMERIC DEFAULT 55000,
  donation_price NUMERIC DEFAULT 50000,
  contact_email TEXT DEFAULT 'info@nationalcake.ng',
  donation_email TEXT DEFAULT 'donation@nationalcake.ng',
  phone_primary TEXT DEFAULT '+2348168378999',
  phone_secondary TEXT DEFAULT '+2348036126128',
  twitter_url TEXT DEFAULT 'https://x.com/AlphaKultureNG',
  facebook_url TEXT DEFAULT 'https://web.facebook.com/alphakulture.ng',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/alphakulture.ng',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/company/alphakulture',
  bank_name TEXT DEFAULT 'UBA',
  account_number TEXT DEFAULT '1021788685',
  account_name TEXT DEFAULT 'EL-SPICE MEDIA LIMITED',
  paystack_product_url TEXT DEFAULT 'https://paystack.com/buy/national-cake',
  paystack_donation_url TEXT DEFAULT 'https://paystack.com/buy/project-giant',
  banner_active BOOLEAN DEFAULT false,
  banner_text TEXT DEFAULT '',
  banner_link TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Community',
  tags TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'general', -- 'general', 'agent', 'order'
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  list_items TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Events & Competitions
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'Competition',
  icon TEXT NOT NULL DEFAULT 'GraduationCap',
  registration_link TEXT DEFAULT '',
  button_text TEXT DEFAULT 'Join Wait List',
  event_date TEXT DEFAULT '',
  status TEXT DEFAULT 'upcoming',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  rating INT DEFAULT 5,
  featured BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Authority Presentations (VIP Carousel)
CREATE TABLE IF NOT EXISTS authority_presentations (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  dignitary_name TEXT NOT NULL,
  image TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Press & Mentions
CREATE TABLE IF NOT EXISTS mentions (
  id BIGSERIAL PRIMARY KEY,
  outlet_name TEXT NOT NULL,
  article_url TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE authority_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentions ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES: Public Read Access (Anon / Unauthenticated)
DROP POLICY IF EXISTS "Public can view site_settings" ON site_settings;
CREATE POLICY "Public can view site_settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view active gallery items" ON gallery;
CREATE POLICY "Public can view active gallery items" ON gallery FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active faqs" ON faqs;
CREATE POLICY "Public can view active faqs" ON faqs FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active events" ON events;
CREATE POLICY "Public can view active events" ON events FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active testimonials" ON testimonials;
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active authority_presentations" ON authority_presentations;
CREATE POLICY "Public can view active authority_presentations" ON authority_presentations FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active mentions" ON mentions;
CREATE POLICY "Public can view active mentions" ON mentions FOR SELECT USING (is_active = true);

-- 5. RLS POLICIES: Authenticated Admin Full CRUD Access
DROP POLICY IF EXISTS "Admins full access on site_settings" ON site_settings;
CREATE POLICY "Admins full access on site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on gallery" ON gallery;
CREATE POLICY "Admins full access on gallery" ON gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on faqs" ON faqs;
CREATE POLICY "Admins full access on faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on events" ON events;
CREATE POLICY "Admins full access on events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on testimonials" ON testimonials;
CREATE POLICY "Admins full access on testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on authority_presentations" ON authority_presentations;
CREATE POLICY "Admins full access on authority_presentations" ON authority_presentations FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access on mentions" ON mentions;
CREATE POLICY "Admins full access on mentions" ON mentions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. DEFAULT SITE SETTINGS SEED
INSERT INTO site_settings (id, product_price, donation_price, contact_email, phone_primary, phone_secondary)
VALUES ('general', 55000, 50000, 'info@nationalcake.ng', '+2348168378999', '+2348036126128')
ON CONFLICT (id) DO UPDATE SET product_price = 55000, donation_price = 50000;

-- 7. SUPABASE STORAGE BUCKET: media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for 'media' bucket
DROP POLICY IF EXISTS "Public media access" ON storage.objects;
CREATE POLICY "Public media access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
CREATE POLICY "Authenticated users can upload media" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated users can update/delete media" ON storage.objects;
CREATE POLICY "Authenticated users can update/delete media" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'media');

