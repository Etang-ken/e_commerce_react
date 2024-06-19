import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { React, useEffect, useState } from 'react'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Authenticator = ({ child }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const getCurrentAuthenticatedUser = async () => {
      const authentication = getAuth()
      const currentAppUser = authentication.currentUser
      onAuthStateChanged(authentication, (user) => {
        console.log(user)
        if (user === null) {
          navigate('/login')
        }
      })
    }
    getCurrentAuthenticatedUser()
  }, [])
  return <>{child}</>
}

export default Authenticator
