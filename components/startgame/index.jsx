import Image from 'next/image';
import React from 'react';

import triangle from '../../public/images/triangle.svg';
import square from '../../public/images/square.svg';
import circle from '../../public/images/circle.svg';
import diamond from '../../public/images/diamond.svg';

function StartGame({ question, player }) {
  // const answerlist = question.map((item) => item.questionList.map((item2) => item2.answerList.map((item3) => item3)))
  // console.log(answerlist);

  console.log(player);

  return (
    <>
      {question.map((game) => (
        <>
          <nav>
            <div className="container mx-auto flex items-center justify-between border-b p-4 backdrop-blur">
              <div className="flex lg:w-0 lg:flex-1">
                <span className="text-sm font-bold md:text-xl">
                  {' '}
                  {game.questionIndex + 1} of {game.questionList.length}
                </span>
              </div>
            </div>
          </nav>

          <div className="ml-2 grid gap-2  md:grid-cols-2   ">
            {game.questionList[game.questionIndex].answerList.map((item) => (
              <div
                key={item.id}
                className={
                  item.bgColor === 'red'
                    ? ` create-blok   bg-[#e21b3c]`
                    : item.bgColor === 'blue'
                    ? `create-blok  bg-[#1368ce]`
                    : item.bgColor === 'yellow'
                    ? `create-blok bg-[#d89e00]`
                    : item.bgColor === 'gren'
                    ? `create-blok bg-[#26890c]`
                    : ''
                }
              >
                <div
                  className={`${
                    item.svgIcon === 'diamond' ? 'rotate-45' : ''
                  } !min-w-[30px] leading-[100%]`}
                >
                  <Image
                    src={
                      item.svgIcon === 'triangle'
                        ? `${triangle.src}`
                        : item.svgIcon === 'square'
                        ? `${square.src}`
                        : item.svgIcon === 'circle'
                        ? `${circle.src}`
                        : item.svgIcon === 'diamond'
                        ? `${diamond.src}`
                        : ''
                    }
                    width="60px"
                    height="60px"
                  />
                </div>

                {/* check dev */}
              </div>
            ))}
          </div>

          <footer className="mt-24  flex h-14 w-full items-center border-t pl-10 text-lg font-bold">
            {player.map((item) => item.playerName)}
          </footer>
        </>
      ))}
    </>
  );
}

export default StartGame;
