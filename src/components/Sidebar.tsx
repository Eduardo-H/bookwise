'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Binoculars,
  List,
  SignIn,
  SignOut,
  TrendUp,
  User,
} from 'phosphor-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import classnames from 'classnames'

import bookwiseLogo from '../assets/svg/bookwise-full-logo.svg'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const currentRoute = usePathname()
  const { data: session, status } = useSession()

  async function handleSignOut() {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <Collapsible.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <aside className="lg:fixed flex flex-row lg:flex-col w-full lg:w-60 lg:h-[calc(100vh-2.5rem)] py-5 lg:pt-10 lg:pb-6 px-6 sm:px-12 lg:my-5 lg:ml-5 lg:rounded-lg border-b lg:border-b-0 border-gray-600 bg-gray-700">
        <div className="flex justify-between lg:justify-center w-full">
          <Link href="/">
            <Image
              src={bookwiseLogo}
              alt="BookWise logo"
              className="mx-auto"
              priority
            />
          </Link>

          <Collapsible.CollapsibleTrigger asChild>
            <button className="block lg:hidden p-1 rounded transition-colors hover:bg-gray-600">
              <List size={24} className="text-gray-400" />
            </button>
          </Collapsible.CollapsibleTrigger>
        </div>

        <div className="hidden lg:flex flex-col flex-1 justify-start items-start gap-5 mt-16">
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
            className="w-fit hidden lg:flex justify-center items-center gap-3 mx-auto"
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
            className="w-fit hidden lg:flex justify-center items-center gap-3 mx-auto py-2 px-4 transition-colors rounded hover:bg-opacity-5 hover:bg-gray-100"
          >
            <span className="font-bold">Login</span>
            <SignIn size={20} className="text-green-100" />
          </Link>
        )}
      </aside>

      <Collapsible.CollapsibleContent className="block lg:hidden bg-gray-700">
        <div className="p-6">
          <div className="flex flex-col flex-1 justify-start items-start gap-5">
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

          <div className="mt-6 pt-5 border-t border-gray-600">
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
                className="w-fit mx-auto flex justify-center items-center gap-3 py-2 px-4 transition-colors rounded hover:bg-opacity-5 hover:bg-gray-100"
              >
                <span className="font-bold">Login</span>
                <SignIn size={20} className="text-green-100" />
              </Link>
            )}
          </div>
        </div>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  )
}
