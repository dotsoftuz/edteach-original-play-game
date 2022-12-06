import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineCrown } from 'react-icons/ai';

import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

import { StartGame, WaitingRoom } from 'components';

function GameId() {
  const [question, setQuestion] = useState([]);
  const [player, setPlayer] = useState([]);
  const [count, setCount] = useState(10);
  const [questionCount, setQuestionCount] = useState(5);
  const [questionTime, setQuestionTime] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const router = useRouter();
  const { gameId } = router.query;

  const { width, height } = useWindowSize();

  useEffect(() => {
    question.map((item) =>
      item.status === 'showingQuestion'
        ? setShowCount(true)
        : setShowCount(false)
    );
  }, [question]);

  useEffect(() => {
    const PlayerId = localStorage.getItem('pID');
    const coll = collection(db, 'question');
    const q = query(coll, where('id', '==', `${gameId}`));
    onSnapshot(q, (snapshot) =>
      setQuestion(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    const collPlayer = collection(db, `question/${gameId}/players`);
    const q1 = query(collPlayer, where('id', '==', `${PlayerId}`));
    onSnapshot(q1, (snapshot) =>
      setPlayer(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, [gameId]);

  // Animation 3s
  useEffect(() => {
    if (questionTime) {
      const interval2 = setInterval(() => {
        if (questionCount) {
          setQuestionCount(questionCount - 1);
        }
        if (questionCount === 0) {
          setQuestionTime(false);
        }
      }, 1000);

      return () => clearInterval(interval2);
    }
  }, [questionTime, questionCount]);

  // Counter 10s
  useEffect(() => {
    if (showCount) {
      const interval = setInterval(() => {
        if (count) {
          setCount(count - 1);
        }
        if (count === 0) {
          setShowCount(false);
          setQuestionTime(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showCount, count]);

  useEffect(() => {
    if (question.map((item) => item.next == true)) {
      setQuestionCount(3);
    }
    if (question.map((item) => item.timeLeft == true)) {
      setQuestionCount(3);
    }
  }, [question]);

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  question.map((item) => {
    console.log(item.title);
  });

  return (
    <div>
      {player.map((item0) => {
        return (
          <>
            {item0.isPlay === false ? (
              <WaitingRoom removeText="Siz chiqarib tashlandingiz" />
            ) : (
              <div>
                {question.map((item) =>
                  item.status === 'showingQuestion' ? (
                    count === 0 ? (
                      <>
                        {questionCount === 0 && (
                          <StartGame
                            question={question}
                            player={player}
                            gameId={gameId}
                          />
                        )}
                        <div
                          className={
                            questionCount === 0
                              ? 'hidden'
                              : 'flex h-screen flex-col items-center justify-center'
                          }
                        >
                          <div className="flex items-center">
                            <div className="mr-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white  md:h-20 md:w-20">
                              <p className="visible text-3xl font-semibold text-white md:text-4xl md:font-bold">
                                {questionCount}
                              </p>
                            </div>
                            <div
                              className={
                                questionCount === 0
                                  ? 'hidden'
                                  : 'visible flex items-center space-x-1 text-5xl font-semibold lg:text-7xl'
                              }
                            >
                              {item.questionList[item.questionIndex].question}
                              <div className="ml-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white  md:h-20 md:w-20">
                                <p className="visible text-3xl font-semibold text-white md:text-4xl md:font-bold">
                                  {questionCount}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mx-auto mt-5 w-full rounded bg-gray-200 md:mt-10 md:w-1/2 ">
                            <div className="shim-red h-4 w-full rounded"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-screen items-center justify-center">
                        <h2
                          className={
                            count === 0
                              ? 'hidden'
                              : 'visible text-5xl lg:text-7xl'
                          }
                        >
                          {count}
                        </h2>
                      </div>
                    )
                  ) : item.status === 'result' ? (
                    <div className="flex h-screen flex-col justify-center">
                      <h2 className="mx-auto h-10 w-20 bg-gray-300  text-center text-white">
                        {item.title}
                      </h2>

                      {/* <div className="hidden lg:block">
                        <Confetti
                          width={width}
                          height={height}
                          tweenDuration={5000}
                        />
                      </div> */}
                      {/* <div className="flex items-end justify-center space-x-2">
                        <div className="relative flex h-24 w-20 items-center justify-center rounded-t-xl rounded-b-lg bg-[#F9C200] hover:bg-opacity-80 md:h-36 md:w-40 lg:h-40 lg:w-48">
                          <div className="absolute top-0 left-0 flex h-10 w-full items-center justify-center rounded-t-xl bg-[#F99500]">
                            <h3 className="font-semibold text-white md:text-lg">
                              Messi
                            </h3>
                          </div>
                          <h3 className="text-3xl font-bold text-white md:text-5xl">
                            3
                          </h3>
                        </div>
                        <div className="relative flex h-36 w-20 items-center justify-center rounded-lg bg-[#006ED4] hover:bg-opacity-80 md:h-56 md:w-40 lg:h-72 lg:w-48">
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 transform text-2xl text-[#006ED4] md:-top-12 md:text-5xl">
                            <AiOutlineCrown />
                          </div>
                          <div className="absolute top-0 left-0 flex h-10 w-full items-center justify-center rounded-t-xl bg-[#0060B8]">
                            <h3 className="font-semibold text-white md:text-lg">
                              Ronaldo
                            </h3>
                          </div>
                          <h3 className="text-3xl font-bold text-white md:text-5xl">
                            1
                          </h3>
                        </div>
                        <div className="relative flex h-28 w-20 items-center justify-center rounded-lg bg-[#EC5858] hover:bg-opacity-80 md:h-44 md:w-40 lg:h-56 lg:w-48">
                          <div className="absolute top-0 left-0 flex h-10 w-full items-center justify-center rounded-t-xl bg-[#D93C3C]">
                            <h3 className="font-semibold text-white md:text-lg">
                              Mbabpe
                            </h3>
                          </div>
                          <h3 className="text-3xl font-bold text-white md:text-5xl">
                            2
                          </h3>
                        </div>
                      </div> */}
                      <div>
                        <div className="mt-14 flex w-full justify-center">
                          <table className="w-[50%] border">
                            <tr className="cursor-pointer border-[1px] hover:bg-gray-100 active:bg-sky-200">
                              <th>Ismi</th>
                              <th>Ball</th>
                              <th>To`g`ri javoblar</th>
                              <th>Noto`g`ri javoblar</th>
                              <th>Savollar soni</th>
                            </tr>
                            <tr className="cursor-pointer border-[1px] hover:bg-gray-100 active:bg-sky-200">
                              <td>{item0.playerName}</td>
                              <td>{item0.point}</td>
                              <td>{item0.intPoint}</td>
                              <td>
                                {item.questionList.length - item0.intPoint}
                              </td>
                              <td>{item.questionList.length}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <WaitingRoom joinText="O'yinga xush kelibsiz " />
                  )
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default GameId;
