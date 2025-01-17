const Pin = ({ handleChange, subscribeUser }) => {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="flex w-fit items-center space-x-2 rounded-lg border border-blue-500 border-opacity-90 bg-gray-200 p-2">
        <input
          className="w-56 rounded-lg bg-white py-2 px-2 outline-none placeholder:text-lg placeholder:font-medium placeholder:text-gray-700 md:w-96 md:py-4"
          type="text"
          onChange={handleChange}
          placeholder="Pin kiriting..."
        />
        <button
          onClick={subscribeUser}
          className="dark:bg-[#1a5cff] w-fit cursor-pointer rounded-lg bg-blue-500 py-3 px-4 text-xs font-medium uppercase text-white
              shadow-md duration-300 ease-in-out hover:shadow-md active:scale-95 
              active:bg-opacity-80 md:px-6 md:py-4 md:text-base"
        >
          Qo&apos;shilish
        </button>
      </div>
    </div>
  );
};

export default Pin;
