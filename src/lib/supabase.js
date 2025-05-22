import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function updateProfile({ full_name, avatar_url }) {
  const {
  data: { user },
  error,
} = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profiles')
    .update({ full_name, avatar_url })
    .eq('id', user.id);

  if (error) throw error;
  return data;
}

export async function getProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error('No user logged in')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}