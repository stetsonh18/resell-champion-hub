// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bvrquccxifqwgkdxifmi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2cnF1Y2N4aWZxd2drZHhpZm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMzA3MTcsImV4cCI6MjA1MTYwNjcxN30.bOxbEjJxtoavnlewZ83H1JG3XK4sIhQcjP-JprmRUpg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);