import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between border-b p-4 backdrop-blur">
        <Link href="/">
          <a className="cursor-pointer">
            <Image width={110} height={40} src="/images/logo.svg" alt="logo" />
          </a>
        </Link>

        <div className="flex items-center space-x-2">
          <a
            className="dark:bg-[#1a5cff] w-fit cursor-pointer rounded-lg bg-blue-500 py-2 px-8 text-sm
          font-medium text-white shadow-md duration-300 ease-in-out 
          hover:shadow-md active:scale-95 active:bg-opacity-80 md:text-sm"
          >
            Kirish
          </a>
          <a
            className="dark:bg-[#1a5cff] hidden w-fit cursor-pointer rounded-lg border border-blue-500 bg-transparent py-2 px-4
          text-sm font-medium text-blue-500 shadow-md duration-300 ease-in-out hover:shadow-md 
          active:scale-95 active:bg-opacity-80 md:block md:text-sm"
          >
            Ro&apos;yxatdan o&apos;tish
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
