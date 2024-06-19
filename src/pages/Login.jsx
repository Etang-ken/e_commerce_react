import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer, Navbar } from '../components'
import { useForm } from 'react-hook-form'
import { isValidEmail } from '../Functions'
import LoadingSpinner from '../components/LoadingSpiner'
import { ToastContainer, toast } from 'react-toastify'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const formValidation = {
    email: {
      required: true,
      validate: {
        minLength: (v) => v.length >= 6,
        matchPattern: (v) => {
          return isValidEmail(v)
        }
      }
    },
    password: {
      required: true,
      validate: {
        minLength: (v) => v.length >= 6
      }
    }
  }

  const onFormSubmit = async (data) => {
    setIsLoading(true)
      try {
        const authentication = getAuth(app)
        const createUser = await signInWithEmailAndPassword(
          authentication,
          data.email,
          data.password
        )
        console.log(createUser)
        toast.success('Login Successful.')
        navigate('/dashboard')
      } catch (e) {
        console.log(e.code)
        if (e.code === 'auth/invalid-credential') {
          toast.error(
            'Invalid login credentials.'
          )
        } else {
          toast.error('Network error. Please try again.')
        }
        // toast.error(
        //   'Registration Failed, please check your credentials and try again.'
        // )
      } finally {
        console.log(data)
        setIsLoading(false)
        // toast.success("Registration Successful.")
      }
  }

  useEffect(() => {
    const getCurrentAuthenticatedUser = async () => {
      const authentication = getAuth()
      onAuthStateChanged(authentication, (user) => {
        console.log(user)
        if (user !== null) {
          navigate('/dashboard')
        }
      })
    }
    getCurrentAuthenticatedUser()
  }, [])
  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
      <ToastContainer position='top-right' />
        <h1 className='text-center'>Login</h1>
        <hr />
        <div className='row my-4 h-100'>
          <div className='col-md-4 col-lg-4 col-sm-8 mx-auto'>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className='my-3'>
                <label htmlFor='display-4'>Email address</label>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  {...register('email', formValidation.email)}
                  placeholder='name@example.com'
                />
                {errors.email?.type === 'required' && (
                  <small className='text-danger'>Email field is required</small>
                )}
                {errors.email?.type === 'minLength' && (
                  <small className='text-danger'>
                    Email must have atleast 6 characters.
                  </small>
                )}
                {errors.email?.type === 'matchPattern' && (
                  <small className='text-danger'>
                    Please enter a valid email
                  </small>
                )}
              </div>
              <div className='my-3'>
                <label htmlFor='floatingPassword display-4'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='floatingPassword'
                  {...register('password', formValidation.password)}
                  placeholder='Password'
                />
                {errors.password?.type === 'required' && (
                  <small className='text-danger'>Password is required.</small>
                )}
                {errors.password?.type === 'minLength' && (
                  <small className='text-danger'>
                    Password must have at 6 characters
                  </small>
                )}
              </div>
              <div className='my-3'>
                <p>
                  New Here?{' '}
                  <Link
                    to='/register'
                    className='text-decoration-underline text-info'
                  >
                    Register
                  </Link>{' '}
                </p>
              </div>
              <div className='text-center'>
                <button
                  className='my-2 mx-auto btn btn-dark d-flex gap-3'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading && <LoadingSpinner />}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
