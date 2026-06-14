import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function createStubSupabaseClient() {
    const handler: ProxyHandler<any> = {
        get() {
            return new Proxy(() => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }), handler);
        },
        apply() {
            return Promise.resolve({ data: null, error: new Error('Supabase is not configured') });
        },
    };

    return new Proxy(() => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }), handler);
}

const supabaseClient: SupabaseClient | any = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createStubSupabaseClient();

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Supabase features are disabled until configured.');
}

export const supabase = supabaseClient;
