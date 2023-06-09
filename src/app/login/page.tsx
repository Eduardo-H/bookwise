'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { RocketLaunch } from 'phosphor-react'
import classnames from 'classnames'

import googleIcon from '../../assets/svg/google-icon.svg'
import githubIcon from '../../assets/svg/github-icon.svg'
import bookwiseLogo from '../../assets/svg/bookwise-logo.svg'

export default function Home() {
  const [isSigningIn, setIsSigningIn] = useState(false)

  async function handleSignInWithGoogle() {
    setIsSigningIn(true)
    await signIn('google', { callbackUrl: '/' })
  }

  async function handleSignInWithGitHub() {
    setIsSigningIn(true)
    await signIn('github', { callbackUrl: '/' })
  }

  return (
    <div className="grid md:grid-cols-2 items-center justify-center w-screen h-screen p-5 bg-gray-800">
      <aside className="hidden md:block h-full w-full">
        <div className="flex items-center justify-center h-full w-full max-w-[600px] mx-auto bg-hero-background bg-cover rounded-lg">
          <Image
            src={bookwiseLogo}
            alt="BookWise logo"
            width={232}
            height={58}
            className="pointer-events-none"
          />
        </div>
      </aside>

      <main className="mx-auto">
        <h1 className="text-lg font-bold text-gray-100">Welcome!</h1>
        <p className="text-base text-gray-100">Log in or access as a guest.</p>

        <div className="flex flex-col gap-5 mt-10">
          <button
            className="flex items-center gap-3 px-6 h-16 w-full sm:w-[320px] text-gray-100 bg-gray-600 rounded-lg transition-colors hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-600"
            onClick={handleSignInWithGoogle}
            disabled={isSigningIn}
          >
            <span>
              <Image
                src={googleIcon}
                alt="Google logo"
                width={24}
                height={24}
              />
            </span>
            <span className="text-gray-100 font-bold">Login with Google</span>
          </button>

          <button
            className="flex items-center gap-3 px-6 h-16 w-full sm:w-[320px] text-gray-100 bg-gray-600 rounded-lg transition-colors hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-600"
            onClick={handleSignInWithGitHub}
            disabled={isSigningIn}
          >
            <span>
              <Image
                src={githubIcon}
                alt="GitHub logo"
                width={24}
                height={24}
              />
            </span>
            <span className="text-gray-100 font-bold">Login with GitHub</span>
          </button>

          <Link
            href="/"
            className={classnames(
              'flex items-center gap-3 px-6 h-16 w-full sm:w-[320px] text-gray-100 bg-gray-600 rounded-lg transition-colors',
              {
                'cursor-not-allowed bg-gray-600': isSigningIn,
                'hover:bg-gray-500': !isSigningIn,
              },
            )}
          >
            <span className="text-purple-100">
              <RocketLaunch size={24} />
            </span>
            <span className="text-gray-100 font-bold">Access as guest</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
