// Supabase Configuration
// ---------------------------------------------------------------------------
// Paste YOUR OWN two values in below, then save. Both are SAFE to be public -
// the anon (publishable) key is DESIGNED to sit in front-end code where anyone
// can read it. What actually keeps your diary private is the Row Level Security
// guard you set up in supabase-setup.sql, NOT the secrecy of this key.
//
// That's the whole lesson of this project - and the deliberate opposite of
// Project 01, where the key MUST stay secret. Here the database is the guard.
//
// Find these in your Supabase Dashboard (create a free project first - see the
// README):
//   Project URL:  Project Settings -> Data API -> Project URL
//   Anon Key:     Project Settings -> API Keys -> anon / publishable key
// ---------------------------------------------------------------------------

const SUPABASE_URL = 'PASTE_YOUR_SUPABASE_PROJECT_URL_HERE';

const SUPABASE_ANON_KEY = 'PASTE_YOUR_SUPABASE_ANON_KEY_HERE';
