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
                      <>
                     { questionCount === 0 && (
                        <StartGame
                          question={question}
                          player={player}
                          count={count}
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
                    ) :(
                      <h2
                        className={
                          count === 0
                            ? 'hidden'
                            : 'text-center text-4xl font-bold'
                        }
                      >
                        {count}
                      </h2>
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
