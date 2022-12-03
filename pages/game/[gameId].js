import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { StartGame, WaitingRoom } from 'components';

function GameId() {
  const [question, setQuestion] = useState([]);
  const [player, setPlayer] = useState([]);
  const [count, setCount] = useState(10);
  const [questionCount, setQuestionCount] = useState(3);
  const [questionTime, setQuestionTime] = useState(false);
  const [showCount, setShowCount] = useState(false);
  // const [time, setTime] = useState();
  // const [block, setBlock] = useState(false);
  // const [singleData, setSingleData] = useState({});
  const router = useRouter();
  const { gameId } = router.query;

  let counter = [];
  console.log(counter);

  for (let i = 1; i <= count; i++) {
    counter.push(i);
  }

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

  //question timer 30s

  // useEffect(() => {
  //   if (questionCount === 0) {
  //     const interval1 = setInterval(() => {
  //       if (time) {
  //         setTime(time - 1);
  //       }
  //       if (time === 0) {
  //         setBlock(true)
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval1);
  //   }
  // }, [questionCount, time]);

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
      {player.map((item) => {
        return (
          <>
            {item.isPlay === false ? (
              <WaitingRoom removeText="Siz olib tashlandingiz." />
            ) : (
              <>
                {question.map((item) =>
                  item.status === 'showingQuestion' ? (
                    count === 0 ? (
<<<<<<< HEAD
                      <StartGame question={question} player={player} />
=======
                      <>
                        {questionCount === 0 && (
                          <StartGame
                            question={question}
                            player={player}
                            // block={block}
                          />
                        )}

                        <h2
                          className={
                            questionCount === 0
                              ? 'hidden'
                              : 'text-center text-4xl font-bold'
                          }
                        >
                          {questionCount}
                        </h2>
                      </>
>>>>>>> d1ce033dc03b1d1df384caab1bb31bf1bee35c5a
                    ) : (
                      <div className="flex h-screen items-center justify-center">
                        <h2
                          className={
                            count === 0
                              ? 'hidden'
                              : 'text-center text-4xl font-bold'
                          }
                        >
                          {count}
                        </h2>
                      </div>
                    )
                  ) : (
                    <WaitingRoom joinText="Xush kelibisz o`yinga" />
                  )
                )}
              </>
            )}
          </>
        );
      })}

    </div>
  );
}

export default GameId;
