import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './Login'
import Profile from './Profile'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return session ? <Profile /> : <Login />
}

export default App
