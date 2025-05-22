import { useState } from 'react'
import { updateProfile } from './lib/supabase'

export default function Profile() {
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile({ full_name: fullName, avatar_url: avatarUrl })
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating profile: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input value={fullName} onChange={e => setFullName(e.target.value)} />
      </label>
      <label>
        Avatar URL:
        <input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from './lib/supabase'

export default function Profile() {
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile()
        setFullName(profile.full_name || '')
        setAvatarUrl(profile.avatar_url || '')
      } catch (err) {
        alert('Failed to load profile: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile({ full_name: fullName, avatar_url: avatarUrl })
      alert('Profile updated!')
    } catch (err) {
      alert('Update failed: ' + err.message)
    }
  }

  if (loading) return <p>Loading profile...</p>

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input value={fullName} onChange={e => setFullName(e.target.value)} />
      </label>
      <label>
        Avatar URL:
        <input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  )
}
