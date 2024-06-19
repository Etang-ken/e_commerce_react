import React, { useState } from 'react'
import { Footer, Navbar } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isValidEmail, isValidPassword } from '../Functions'
import LoadingSpinner from '../components/LoadingSpiner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../firebase'
const Register = () => {
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
    },
    repeatPassword: {
      required: true,
      validate: {
        minLength: (v) => v.length >= 6
      }
    }
  }

  const onFormSubmit = async (data) => {
    setIsLoading(true)
    if (data.password == data.repeatPassword) {
      try {
        const authentication = getAuth(app)
        const createUser = await createUserWithEmailAndPassword(
          authentication,
          data.email,
          data.password
        )
        console.log(createUser)
        toast.success('Registration Successful.')
        navigate('/login')
      } catch (e) {
        console.log(e.code)
        if (e.code === 'auth/email-already-in-use') {
          toast.error(
            'A user with this email already exists. Please user another email.'
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
    } else {
      toast.error('Passwords do not match.')
      setIsLoading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <ToastContainer position='top-right' />
        <h1 className='text-center'>Register</h1>
        <hr />
        <div className='row my-4 h-100'>
          <div className='col-md-4 col-lg-4 col-sm-8 mx-auto'>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              {/* <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    {...register("name", formValidation.name)}
                                    placeholder="Enter Your Name"
                                />
                                {errors.name?.type === 'required' && (
                                    <small className='text-danger'>Full Name is required.</small>
                                )}
                                {errors.name?.type === 'minLength' && (
                                    <small className='text-danger'>Name must have atleast 3 characters</small>
                                )}
                            </div> */}
              <div className='form my-3'>
                <label htmlFor='Email'>Email address</label>
                <input
                  type='text'
                  className='form-control'
                  id='Email'
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
              <div className='form  my-3'>
                <label htmlFor='Password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='Password'
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
              <div className='form  my-3'>
                <label htmlFor='RepeatPassword'>Repeat Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='repeatPasword'
                  {...register('repeatPassword', formValidation.repeatPassword)}
                  placeholder='Password'
                />
                {errors.password?.type === 'required' && (
                  <small className='text-danger'>
                    Repeat Password is required.
                  </small>
                )}
                {errors.password?.type === 'minLength' && (
                  <small className='text-danger'>
                    Password must have at 6 characters
                  </small>
                )}
              </div>
              <div className='my-3'>
                <p>
                  Already has an account?{' '}
                  <Link
                    to='/login'
                    className='text-decoration-underline text-info'
                  >
                    Login
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
                  Register
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

export default Register
