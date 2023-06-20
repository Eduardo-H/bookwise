'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Binoculars, SignIn, SignOut, TrendUp, User } from 'phosphor-react'
import classnames from 'classnames'

import bookwiseLogo from '../assets/svg/bookwise-full-logo.svg'
import { signOut, useSession } from 'next-auth/react'

export function Sidebar() {
  const currentRoute = usePathname()
  const { data: session, status } = useSession()

  async function handleSignOut() {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <aside className="fixed h-[calc(100vh-2.5rem)] w-60 flex flex-col bg-gray-700 pt-10 pb-6 px-12 my-5 ml-5 rounded-lg">
      <Link href="/">
        <Image
          src={bookwiseLogo}
          alt="BookWise logo"
          className="mx-auto"
          priority
        />
      </Link>

      <div className="flex flex-col flex-1 justify-start items-start gap-5 mt-16">
        <Link
          href="/"
          prefetch={false}
          className={classnames(
            'flex items-center text-base gap-3 transition-colors hover:text-gray-100',
            {
              "before:content[''] before:h-6 before:w-1 before:bg-gradient-to-b before:from-green-100 before:to-purple-100 before:rounded-full before:mr-4 font-bold text-gray-100":
                currentRoute === '/',
              'px-8 text-gray-400': currentRoute !== '/',
            },
          )}
        >
          <TrendUp className="text-2xl" weight="bold" />
          <span>Home</span>
        </Link>

        <Link
          href="/explore"
          prefetch={false}
          className={classnames(
            'flex items-center text-base gap-3 transition-colors hover:text-gray-100',
            {
              "before:content[''] before:h-6 before:w-1 before:bg-gradient-to-b before:from-green-100 before:to-purple-100 before:rounded-full before:mr-4 font-bold text-gray-100":
                currentRoute === '/explore',
              'px-8 text-gray-400': currentRoute !== '/explore',
            },
          )}
        >
          <Binoculars className="text-2xl" />
          <span>Explore</span>
        </Link>

        {status === 'authenticated' && (
          <Link
            href={`/${session.user.id}/profile`}
            prefetch={false}
            className={classnames(
              'flex items-center text-base gap-3 transition-colors hover:text-gray-100',
              {
                "before:content[''] before:h-6 before:w-1 before:bg-gradient-to-b before:from-green-100 before:to-purple-100 before:rounded-full before:mr-4 font-bold text-gray-100":
                  currentRoute.endsWith('/profile'),
                'px-8 text-gray-400': !currentRoute.endsWith('/profile'),
              },
            )}
          >
            <User className="text-2xl" />
            <span>Profile</span>
          </Link>
        )}
      </div>

      {status === 'authenticated' ? (
        <button
          className="w-fit flex justify-center items-center gap-3 mx-auto"
          onClick={handleSignOut}
        >
          <div className="flex items-center justify-center h-[calc(2rem+2px)] w-[calc(2rem+2px)] bg-gradient-to-b from-green-100 to-purple-100 rounded-full">
            <Image
              src={session.user.avatar_url}
              alt={session.user.name}
              height={32}
              width={32}
              className="rounded-full h-8 w-8 object-cover"
            />
          </div>

          <span className="text-sm text-gray-100">
            {session.user.name.split(' ')[0]}
          </span>

          <SignOut size={20} className="text-red-500" />
        </button>
      ) : (
        <Link
          href="/login"
          className="w-fit flex justify-center items-center gap-3 mx-auto py-2 px-4 transition-colors rounded hover:bg-opacity-5 hover:bg-gray-100"
        >
          <span className="font-bold">Login</span>
          <SignIn size={20} className="text-green-100" />
        </Link>
      )}
    </aside>
  )
}
