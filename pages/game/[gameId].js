import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { StartGame, WaitingRoom } from 'components';

function GameId() {
  const [question, setQuestion] = useState([]);
  const [player, setPlayer] = useState([]);
  const [count, setCount] = useState(10);
  const [podium, setPodium] = useState(false);
  const router = useRouter();
  const { gameId } = router.query;

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

  useEffect(() => {
    if (question.map((item) => item.status === 'showingQuestion')) {
      const interval = setInterval(() => {
        if (count) {
          setCount(count - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count]);

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
                      <StartGame question={question} player={player} />
                    ) : (
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
