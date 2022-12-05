import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

  return (
    <div>
      {player.map((item0, index) => {
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
                    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
                      {/* <div className="flex justify-around w-[40%] items-end">
                    <div className="w-48 h-72 bg-yellow-500 rounded-lg">
                      <p className="text-center text-white font-semibold p-4 text-2xl">
                      </p>
                    </div>
                    <div className="w-48 h-96 bg-blue-500 rounded-lg">
                      <p className="text-center text-white font-semibold p-4 text-2xl">
                      </p>
                    </div>
                    <div className="w-48 h-60 bg-rose-500 rounded-lg">
                      <p className="text-center text-white font-semibold p-4 text-2xl">
                      </p>
                    </div>
                  </div> */}
                      <div className="mt-14 flex w-full justify-center">
                        <table className="w-[50%] border">
                          <tr className="cursor-pointer border-[1px] hover:bg-gray-100 active:bg-sky-200">
                            <th>№</th>
                            <th>Ismi</th>
                            <th>Ball</th>
                            <th>To`g`ri javoblar</th>
                            <th>Noto`g`ri javoblar</th>
                            <th>Savollar soni</th>
                          </tr>
                          <tr className="cursor-pointer border-[1px] hover:bg-gray-100 active:bg-sky-200">
                            <td>{index + 1}</td>
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
                  ) : (
                    <WaitingRoom joinText="Xush kelibsiz o'yinga" />
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
