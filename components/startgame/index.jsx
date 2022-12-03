import Image from 'next/image';
import React, { useState } from 'react';

import triangle from '../../public/images/triangle.svg';
import square from '../../public/images/square.svg';
import circle from '../../public/images/circle.svg';
import diamond from '../../public/images/diamond.svg';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function StartGame({ question, player, gameId }) {
  const [correct, setCorrect] = useState(false);
  const [index, setIndex] = useState(0);
  const getCorrectAnswer = (index, i) => {
    setCorrect(true);
    setIndex(i);
    question.map((item) => {
      const hello = item.questionList[index].answerList.map(
        (item2) => item2.isCorrect
      );

      let result = hello[i] === true ? 10 : 0;

      const updatePlayer = async () => {
        const PlayerId = localStorage.getItem('pID');
        const questPlayer = doc(db, `question/${item.id}/players`, PlayerId);
        const Player = await getDoc(questPlayer);
        const point = Player.data().point;
        await updateDoc(questPlayer, {
          point: point + result,
        });
      };
      updatePlayer();
    });
  };

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

          {correct === false ? (
            <div className="ml-2 mt-2 grid  gap-2 md:grid-cols-2  ">
              {game.questionList[game.questionIndex].answerList.map(
                (item, index) => (
                  <div
                    key={item.id}
                    onClick={() => getCorrectAnswer(game.questionIndex, index)}
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
                  </div>
                )
              )}
            </div>
          ) : (
            <>
              <div
                className={
                  game.questionList[game.questionIndex].answerList[index]
                    .bgColor === 'red'
                    ? ` create-blok   bg-[#e21b3c]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'blue'
                    ? `create-blok  bg-[#1368ce]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'yellow'
                    ? `create-blok bg-[#d89e00]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'gren'
                    ? `create-blok bg-[#26890c]`
                    : ''
                }
              >
                <div
                  className={`${
                    game.questionList[game.questionIndex].answerList[index]
                      .svgIcon === 'diamond'
                      ? 'rotate-45'
                      : ''
                  } !min-w-[30px] leading-[100%]`}
                >
                  <Image
                    src={
                      game.questionList[game.questionIndex].answerList[index]
                        .svgIcon === 'triangle'
                        ? `${triangle.src}`
                        : game.questionList[game.questionIndex].answerList[
                            index
                          ].svgIcon === 'square'
                        ? `${square.src}`
                        : game.questionList[game.questionIndex].answerList[
                            index
                          ].svgIcon === 'circle'
                        ? `${circle.src}`
                        : game.questionList[game.questionIndex].answerList[
                            index
                          ].svgIcon === 'diamond'
                        ? `${diamond.src}`
                        : ''
                    }
                    width="60px"
                    height="60px"
                  />
                </div>

                {/* check dev */}
              </div>
            </>
          )}

          <footer className="mt-2 flex h-10 w-full items-center border-t pl-10 text-lg font-bold">
            {player.map((item) => item.playerName)}
          </footer>
        </>
      ))}
    </>
  );
}

export default StartGame;
