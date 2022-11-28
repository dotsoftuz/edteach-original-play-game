import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function gameId() {
  const [question, setQuestion] = useState([]);
  const [player, setPlayer] = useState([]);
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

  return (
    <div>
      {player.map((item) => {
        return <>{item.isPlay === false ? <h1>Xayr</h1> : <h1>Salom</h1>}</>;
      })}
    </div>
  );
}

export default gameId;
