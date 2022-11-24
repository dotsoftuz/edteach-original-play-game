import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between p-4 backdrop-blur border-b">
        <div className="flex lg:w-0 lg:flex-1">
          <Link href="/">
            <span className="text-sm font-semibold md:text-xl">edTeach</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <a
            className="w-fit cursor-pointer rounded-lg bg-purple-500 py-2 px-8 text-sm font-medium
          text-white shadow-md duration-300 ease-in-out hover:shadow-md 
          active:scale-95 active:bg-opacity-80 dark:bg-[#1a5cff] md:text-sm"
          >
            Kirish
          </a>
          <a
            className="w-fit cursor-pointer rounded-lg border border-purple-500 bg-transparent py-2 px-4
          text-sm font-medium text-purple-500 shadow-md duration-300 ease-in-out hover:shadow-md 
          active:scale-95 active:bg-opacity-80 dark:bg-[#1a5cff] md:text-sm"
          >
            Ro&apos;yxatdan o&apos;tish
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
