const WaitingRoom = ({ joinText, removeText }) => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center space-y-3">
      <h1 className="text-3xl">{joinText}</h1>
      <h1 className="text-3xl text-red-500">{removeText}</h1>
      {joinText && (
        <div className="flex items-end">
          <h1 className="text-3xl font-semibold">
            Boshqalar ham qo&apos;shilshini kuting
          </h1>
          <div className="ml-1 mb-1.5 flex items-center space-x-1">
            <div className="h-1 w-1 animate-waitingLoader1 rounded-full bg-black md:h-1.5 md:w-1.5" />
            <div className="h-1 w-1 animate-waitingLoader2 rounded-full bg-black md:h-1.5 md:w-1.5" />
            <div className="h-1 w-1 animate-waitingLoader3 rounded-full bg-black md:h-1.5 md:w-1.5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
