import Image from 'next/image';
import React, { useState } from 'react';

import triangle from '../../public/images/triangle.svg';
import square from '../../public/images/square.svg';
import circle from '../../public/images/circle.svg';
import diamond from '../../public/images/diamond.svg';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function StartGame({ question, player }) {
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
      let IntResult = hello[i] === true ? 1 : 0;

      const updatePlayer = async () => {
        const PlayerId = localStorage.getItem('pID');
        const questPlayer = doc(db, `question/${item.id}/players`, PlayerId);
        const Player = await getDoc(questPlayer);
        const point = Player.data().point;
        const intPoint = Player.data().intPoint;
        await updateDoc(questPlayer, {
          point: point + result,
          intPoint: intPoint + IntResult,
        });
      };
      updatePlayer();
    });
  };

  return (
    <>
      {question.map((game) => (
        <>
          <nav className="flex items-center justify-between p-2 md:p-3">
            <div className="text-lg font-bold md:text-3xl">
              {game.questionIndex + 1}/{game.questionList.length}
            </div>
            <div className="text-lg font-bold md:text-3xl">
              {player.map((item) => item.playerName)}
            </div>
          </nav>

          {correct === false ? (
            <div className="grid   grid-cols-2 grid-rows-2 gap-2 p-2">
              {game.questionList[game.questionIndex].answerList.map(
                (item, index) => (
                  <div
                    key={item.id}
                    onClick={() => getCorrectAnswer(game.questionIndex, index)}
                    className={
                      item.bgColor === 'red'
                        ? ` create-blok bg-[#e21b3c]`
                        : item.bgColor === 'blue'
                        ? `create-blok bg-[#1368ce]`
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
            <div className="md:-p-0 flex h-[90vh] p-2 md:items-center md:justify-center">
              <div
                className={
                  game.questionList[game.questionIndex].answerList[index]
                    .bgColor === 'red'
                    ? ` create-blok h-[93vh] w-full bg-[#e21b3c] md:h-1/2 md:w-[50vw]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'blue'
                    ? `create-blok h-[93vh] w-full bg-[#1368ce] md:h-1/2 md:w-[50vw]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'yellow'
                    ? `create-blok h-[93vh] w-full bg-[#d89e00] md:h-1/2 md:w-[50vw]`
                    : game.questionList[game.questionIndex].answerList[index]
                        .bgColor === 'gren'
                    ? `create-blok h-[93vh] w-full bg-[#26890c] md:h-1/2 md:w-[50vw]`
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
            </div>
          )}
        </>
      ))}
    </>
  );
}

export default StartGame;
