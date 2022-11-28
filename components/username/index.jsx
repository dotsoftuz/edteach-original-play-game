const Username = ({ handleChangeName, joinUser }) => {
  return (
    <div className="flex w-fit items-center space-x-2 rounded-lg border border-purple-500 border-opacity-90 bg-gray-200 p-2">
      <input
        className="w-56 rounded-lg bg-white py-2 px-2 outline-none placeholder:text-lg placeholder:font-medium placeholder:text-gray-700 md:w-96 md:py-4"
        type="text"
        placeholder="Ismgizni yozing."
        onChange={handleChangeName}
      />
      <button
        className="dark:bg-[#1a5cff] w-fit cursor-pointer rounded-lg bg-purple-500 py-3 px-4 text-xs font-medium uppercase text-white
              shadow-md duration-300 ease-in-out hover:shadow-md active:scale-95 
              active:bg-opacity-80 md:px-6 md:py-4 md:text-base"
        onClick={joinUser}
      >
        Qo&apos;shilish
      </button>
    </div>
  );
};

export default Username;
