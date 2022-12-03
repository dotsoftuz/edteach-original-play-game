import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Nimadir нито ketdi.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Bunday sahifa topilmadi.
          </p>
          <Link href="/">
            <a
              className="w-fit rounded-lg py-3 px-4 font-medium shadow-md text-sm duration-300
          active:bg-opacity-80 cursor-pointer ease-in-out active:scale-95 bg-blue-500 
          dark:bg-[#1a5cff] md:text-sm text-white hover:shadow-md"
            >
              Bosh sahifaga o&apos;tish
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
