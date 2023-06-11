'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Binoculars, SignIn, TrendUp, User } from 'phosphor-react'
import classnames from 'classnames'

import bookwiseLogo from '../assets/svg/bookwise-full-logo.svg'

export function Sidebar() {
  const currentRoute = usePathname()

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

        <Link
          href="/profile"
          prefetch={false}
          className={classnames(
            'flex items-center text-base gap-3 transition-colors hover:text-gray-100',
            {
              "before:content[''] before:h-6 before:w-1 before:bg-gradient-to-b before:from-green-100 before:to-purple-100 before:rounded-full before:mr-4 font-bold text-gray-100":
                currentRoute === '/profile',
              'px-8 text-gray-400': currentRoute !== '/profile',
            },
          )}
        >
          <User className="text-2xl" />
          <span>Profile</span>
        </Link>
      </div>

      <Link
        href="/login"
        className="w-fit flex justify-center items-center gap-3 mx-auto py-2 px-4 transition-colors rounded hover:bg-opacity-5 hover:bg-gray-100"
      >
        <span className="font-bold">Login</span>
        <SignIn size={20} className="text-green-100" />
      </Link>
    </aside>
  )
}
