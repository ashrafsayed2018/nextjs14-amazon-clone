'use client'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}
function Form() {
  const { data: session } = useSession()

  const params = useSearchParams()

  const router = useRouter()

  let callbackUrl = params.get('callbackUrl') || '/'
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, session, router])
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form
    signIn('credentials', {
      email,
      password,
    })
  }
  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign in</h1>
        {params.get('error') && (
          <div className="alert text-error">
            {params.get('error') === 'CredentialsSignin'
              ? 'invalid email and password'
              : params.get('error')}
          </div>
        )}
        {params.get('success') && (
          <div className="alert text-success">{params.get('success')}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full max-w-sm"
              id="email"
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[^@]+@[^@]+.[^@]+$/,
                  message: 'email is invalid',
                },
              })}
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email?.message}</div>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-sm"
              id="password"
              {...register('password', {
                required: 'password is required',
              })}
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password?.message}</div>
            )}
          </div>
          <div className="m-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Sign in{' '}
            </button>
          </div>
        </form>
        <div>
          Dont have an account?{' '}
          <Link className="link" href={`/register?callbackUrl=${callbackUrl}`}>
            register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
