import { useEffect } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from 'components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { uuid } from 'uuidv4';
import { Username, Pin, WaitingRoom } from 'components';

export default function Home() {
  const [getQuestion, setGetQuestion] = useState([]);
  const [pin, setPin] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [pinTrue, setPinTrue] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const id = uuid();

  const handleChangeName = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const coll = collection(db, 'question');
      const q = query(coll, where('pin', '==', pin));
      onSnapshot(q, (snapshot) =>
        setGetQuestion(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    };
    fetch();
  }, [pin]);

  const subscribeUser = () => {
    getQuestion.map((item) => {
      if (item.pin === pin) {
        if (item.status === 'started') setPinTrue(true);
      } else {
        console.log('Afsus');
      }
    });
  };

  const joinUser = async () => {
    getQuestion.map(async (item) => {
      if (playerName !== '') {
        const time = new Date();
        const questPlayer = doc(db, `question/${item.id}/players`, id);
        const quest = doc(db, 'question', item.id);
        const question = await getDoc(quest);
        localStorage.setItem('pID', id);
        await setDoc(questPlayer, {
          playerName,
          time,
          isPlay: true,
          id: id,
          point: 0
        }).then(async () => {
          const PlayerIds = question.data().playerId.map((i) => i);
          await updateDoc(doc(db, 'question', item.id), {
            playerId: [
              ...PlayerIds,
              {
                id,
                playerName,
              },
            ],
          });
        });
        router.push(`/game/${item.id}`);
      }
    });
  };


  return (
    <div>
      <Head>
        <title>Hey, what&apos;s up!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <div className="flex h-[90vh] items-center justify-center">
        {pinTrue ? (
          <Username handleChangeName={handleChangeName} joinUser={joinUser} />
        ) : (
          <Pin handleChange={handleChange} subscribeUser={subscribeUser} />
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
