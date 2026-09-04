import { supabase } from './supabase'
import type { Teacher } from '@/types/teacher'
import { teachers as initialTeachers } from '@/data/teachers'

// Fetch all teachers from the database
export async function getTeachers(): Promise<Teacher[]> {
  try {
    const { data, error } = await supabase.from('teachers').select('data')
    if (error) {
      console.error('Error fetching teachers from Supabase:', error)
      return initialTeachers
    }
    
    if (data && data.length > 0) {
      return data.map(row => row.data as Teacher)
    }
    
    return initialTeachers
  } catch (err) {
    console.error('Failed to get teachers:', err)
    return initialTeachers
  }
}

// Fetch a single teacher by slug
export async function getTeacherBySlug(slug: string): Promise<Teacher | undefined> {
  try {
    // We fetch all and filter client side since 'data' is JSONB and we might not have indexing on data->>slug
    // For small data sets, this is perfectly fine.
    const all = await getTeachers()
    return all.find(t => t.slug === slug)
  } catch (err) {
    console.error('Failed to get teacher by slug:', err)
    return initialTeachers.find(t => t.slug === slug)
  }
}

// Save a teacher (Insert or Update)
export async function saveTeacher(teacher: Teacher): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('teachers')
      .upsert({ id: teacher.id, data: teacher })

    if (error) {
      console.error('Error saving teacher to Supabase:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Failed to save teacher:', err)
    return false
  }
}

// Delete a teacher
export async function deleteTeacher(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting teacher from Supabase:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Failed to delete teacher:', err)
    return false
  }
}

// Check if we can reach supabase
export async function isDatabaseConnected(): Promise<boolean> {
  try {
    const { error } = await supabase.from('teachers').select('id').limit(1)
    return !error
  } catch {
    return false
  }
}
