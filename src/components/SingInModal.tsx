import Image from 'next/image'
import { X } from 'phosphor-react'
import { signIn } from 'next-auth/react'
import * as Dialog from '@radix-ui/react-dialog'

import googleIcon from '../assets/svg/google-icon.svg'
import githubIcon from '../assets/svg/github-icon.svg'

interface SignInModalProps {
  isOpen: boolean
  onClose: (isModalOpen: boolean) => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  async function handleSignInWithGoogle() {
    await signIn('google')
  }

  async function handleSignInWithGitHub() {
    await signIn('github')
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.3)]" />

        <Dialog.Content className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[516px] py-14 px-[4.5rem] bg-gray-700 rounded-xl">
          <Dialog.Close asChild>
            <X
              size={28}
              weight="bold"
              className="fixed p-1 top-4 right-4 text-gray-400 rounded cursor-pointer transition-colors hover:bg-opacity-5 hover:bg-gray-100"
            />
          </Dialog.Close>

          <p className="text-center font-bold">Sign in to review this book</p>

          <div className="flex flex-col gap-4 mt-10">
            <button
              className="flex items-center gap-5 py-5 px-6 rounded-lg bg-gray-600 transition-colors hover:bg-gray-500"
              onClick={handleSignInWithGoogle}
            >
              <Image
                src={googleIcon}
                alt="Google logo"
                width={24}
                height={24}
              />
              <span className="text-lg font-bold">Sign in with Google</span>
            </button>

            <button
              className="flex items-center gap-5 py-5 px-6 rounded-lg bg-gray-600 transition-colors hover:bg-gray-500"
              onClick={handleSignInWithGitHub}
            >
              <Image
                src={githubIcon}
                alt="GitHub logo"
                width={24}
                height={24}
              />
              <span className="text-lg font-bold">Sign in with GitHub</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
