import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-b from-blue-400 to-blue-600 min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-white border-4 border-blue-700 rounded-xl p-10 shadow-2xl">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-blue-800 drop-shadow-lg font-[Comic Sans MS]">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-blue-900">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-bold text-blue-700 underline hover:text-blue-900"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center font-bold">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              className="border-2 border-blue-700 bg-blue-50 text-blue-900 rounded-md p-2 shadow-inner"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="border-2 border-blue-700 bg-blue-50 text-blue-900 rounded-md p-2 shadow-inner"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="border-2 border-blue-700 bg-blue-50 text-blue-900 rounded-md p-2 shadow-inner"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-800 border-2 border-blue-900"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
