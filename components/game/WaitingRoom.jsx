const WaitingRoom = ({ joinText, removeText }) => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center space-y-1 md:space-y-2">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold md:text-3xl">{joinText} </h1>
        <img
          src="https://emoji-uc.akamaized.net/orig/7a/18a99360c57455f91cf019d64fc1b4.png"
          className="h-auto w-7 md:w-10 animate-handAnimation"
        />
      </div>
      <h1 className="text-3xl text-red-500">{removeText}</h1>
      {joinText && (
        <div className="flex items-end">
          <h1 className="text-xl md:text-3xl font-semibold">
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

//

export default WaitingRoom;
