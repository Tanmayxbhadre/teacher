import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvfshiykflwuidcipkms.supabase.co'
const supabaseKey = 'sb_publishable_7dX8MJGRG0_FgdedEEt1Nw_Cnt0d8lC'

export const supabase = createClient(supabaseUrl, supabaseKey)
