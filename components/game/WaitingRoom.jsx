import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const WaitingRoom = ({ joinText, removeText }) => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center space-y-1 md:space-y-2">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold md:text-3xl md:font-bold lg:text-4xl">
          {joinText}
        </h1>
        {joinText && (
          <img
            src="https://emoji-uc.akamaized.net/orig/7a/18a99360c57455f91cf019d64fc1b4.png"
            className="h-auto w-7 animate-handAnimation md:w-10"
          />
        )}
      </div>
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-rose-600 md:text-3xl md:font-bold lg:text-4xl">
          {removeText}
        </h1>
        {removeText && (
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/pensive-face_1f614.png"
            className="h-auto w-7 animate-handAnimation md:w-12"
          />
        )}
      </div>
      {joinText && (
        <div>
          <div className="flex items-end mb-5 md:mb-7">
            <h1 className="text-xl font-semibold md:text-3xl md:font-bold lg:text-5xl">
              Boshqalar ham qo&apos;shilishini kuting
            </h1>
            <div className="ml-1 mb-1.5 flex items-center space-x-1">
              <div className="h-1 w-1 animate-waitingLoader1 rounded-full bg-black md:h-1.5 md:w-1.5 lg:h-2 lg:w-2" />
              <div className="h-1 w-1 animate-waitingLoader2 rounded-full bg-black md:h-1.5 md:w-1.5 lg:h-2 lg:w-2" />
              <div className="h-1 w-1 animate-waitingLoader3 rounded-full bg-black md:h-1.5 md:w-1.5 lg:h-2 lg:w-2" />
            </div>
          </div>
        </div>
      )}
      <Link href="/">
        <a className={`${joinText ? 'bg-blue-500 hover:bg-blue-600' : 'bg-rose-500 hover:bg-rose-600'} mx-auto flex w-fit cursor-pointer items-center justify-center rounded-xl  py-2 px-4 text-sm font-bold text-white duration-200  md:py-3 md:px-8 md:text-base`}>
          Chiqish
        </a>
      </Link>
    </div>
  );
};

//

export default WaitingRoom;
