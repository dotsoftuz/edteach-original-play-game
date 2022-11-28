const WaitingRoom = ({ text }) => {
  return (
    <div className="flex flex-col space-y-3 h-screen items-center justify-center">
      <h1 className="text-3xl">{text}</h1>
      <div className="flex items-end">
        <h1 className="text-3xl font-semibold">
          Boshqalar ham qo&apos;shilshini kuting
        </h1>
        <div className="ml-1 mb-1.5 flex items-center space-x-1">
          <div className="h-1 w-1 animate-waitingLoader rounded-full bg-black duration-75 md:h-1.5 md:w-1.5" />
          <div className="h-1 w-1 animate-waitingLoader rounded-full bg-black duration-100 md:h-1.5 md:w-1.5" />
          <div className="h-1 w-1 animate-waitingLoader rounded-full bg-black duration-150 md:h-1.5 md:w-1.5" />
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
