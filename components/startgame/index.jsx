import Image from 'next/image';
import React, { useState } from 'react';

import triangle from '../../public/images/triangle.svg';
import square from '../../public/images/square.svg';
import circle from '../../public/images/circle.svg';
import diamond from '../../public/images/diamond.svg';

function StartGame({ question, player, count }) {
    // const answerlist = question.map((item) => item.questionList.map((item2) => item2.answerList.map((item3) => item3)))
    // console.log(answerlist);

    // console.log(question.map((game) => (game.questionIndex)));
    // console.log(question.map((game) => (game.questionList)));


    const [correct, setCorrect] = useState("")

    const hello = question.map((item) => { item.questionList[item.questionIndex].answerList.map((item2) => item2.isCorrect) });


 
    const getCorrectAnswer = (index, i) => {

        question.map((item) => {
            const hello = item.questionList[index].answerList.map((item2) => item2.isCorrect);

            hello[i] === true ? setCorrect("togri") : setCorrect("xato")



        })

        

    }


    return (
        <>



            {question.map((game) => (
                <>

                    <nav>
                        <div className="container mx-auto flex items-center justify-between p-4 backdrop-blur border-b">
                            <div className="flex lg:w-0 lg:flex-1">

                                <span className="text-sm font-bold md:text-xl">  {game.questionIndex + 1} of{' '}
                                    {game.questionList.length}</span>

                            </div>


                        </div>
                    </nav>

                 

                        <div className="grid gap-2 md:grid-cols-2  ml-2   ">
                            {game.questionList[
                                game.questionIndex
                            ].answerList.map((item) => (
                                <div
                                    key={item.id}
                                    className={
                                        item.bgColor === 'red'
                                            ? ` bg-[#e21b3c]   create-blok`
                                            : item.bgColor === 'blue'
                                                ? `bg-[#1368ce]  create-blok`
                                                : item.bgColor === 'yellow'
                                                    ? `bg-[#d89e00] create-blok`
                                                    : item.bgColor === 'gren'
                                                        ? `bg-[#26890c] create-blok`
                                                        : ''
                                    }
                                >
                                    <div
                                        className={`${item.svgIcon === 'diamond'
                                            ? 'rotate-45'
                                            : ''
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
                  


                        <footer className='w-full  mt-24 h-14 border-t flex items-center pl-10 text-lg font-bold'>
                            {player.map((item) => item.playerName) }
                        </footer>


                </>
            ))}
        </>
    );
}

export default StartGame;
