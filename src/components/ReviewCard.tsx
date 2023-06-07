import Image from 'next/image'

import bookCover from '../assets/the-hobbit.png'
import { StarReview } from './StarReview'

export function ReviewCard() {
  return (
    <div className="flex gap-8 bg-gray-700 p-6 rounded-lg">
      <header>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-b from-green-100 to-purple-100 rounded-full">
            <Image
              src="https://github.com/Eduardo-H.png"
              alt="Eduardo Oliveira"
              height={36}
              width={36}
              className="rounded-full h-9 w-9"
            />
          </div>

          <div className="flex flex-col flex-1">
            <p className="text-gray-100">Eduardo Oliveira</p>
            <span className="text-sm text-gray-400">Yesterday</span>
          </div>

          <StarReview stars={4} />
        </div>

        <div className="flex gap-5 mt-8">
          <Image
            src={bookCover}
            alt="Book cover"
            height={152}
            width={108}
            className="h-[152px] w-[108px] rounded"
          />

          <div>
            <h5 className="font-bold">The Hobbit</h5>
            <span className="text-sm text-gray-400">J.R.R Tolkien</span>

            <article className="text-sm text-justify mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              atque inventore debitis beatae veniam quis, voluptatum fugit eius
              minus tempora distinctio harum temporibus eos labore sit quidem
              commodi praesentium neque, similique quia sed! Modi quod fugit
              voluptate? Illum porro unde numquam veritatis facilis aspernatur
              provident eaque sunt saepe. Rem, ea?
            </article>
          </div>
        </div>
      </header>
    </div>
  )
}
