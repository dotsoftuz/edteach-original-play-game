import React, { useEffect } from 'react';
import Head from 'next/head';

import { Pin, Username, WaitingRoom } from 'components';
import { useRouter } from 'next/router';
import { Pin } from 'components';
import { useState } from 'react';
import {
  addDoc,
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
        const quest = doc(db, `question`, item.id);
        const question = await getDoc(quest);
        localStorage.setItem('pID', id);
        await setDoc(questPlayer, {
          playerName,
          time,
          isPlay: true,
          id: id,
        }).then(async () => {
          const PlayerIds = question.data().playerId.map((i) => i);
          await updateDoc(doc(db, `question`, item.id), {
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

  console.log(getQuestion);

  return (
    <div>
      <Head>
        <title>Hey, what's up!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Pin />
        <Username />
        <WaitingRoom />
        {pinTrue ? (
          <div>
            <input
              type="text"
              placeholder="Ismingiz"
              onChange={handleChangeName}
            />
            <button
              className="dark:bg-[#1a5cff] w-fit cursor-pointer rounded-lg bg-purple-500 py-3 px-4 text-xs font-medium uppercase text-white
              shadow-md duration-300 ease-in-out hover:shadow-md active:scale-95 
              active:bg-opacity-80 md:px-6 md:py-4 md:text-base"
              onClick={joinUser}
            >
              Qo&apos;shilish
            </button>
          </div>
        ) : (
          <div className="flex h-[90vh] items-center justify-center">
            <div className="flex w-fit items-center space-x-2 rounded-lg border border-purple-500 border-opacity-90 bg-gray-200 p-2">
              <input
                className="w-56 rounded-lg bg-white py-2 px-2 outline-none placeholder:text-lg placeholder:font-medium placeholder:text-gray-700 md:w-96 md:py-4"
                type="text"
                onChange={handleChange}
                placeholder="Pinni qo'shing."
              />
              <button
                className="dark:bg-[#1a5cff] w-fit cursor-pointer rounded-lg bg-purple-500 py-3 px-4 text-xs font-medium uppercase text-white
              shadow-md duration-300 ease-in-out hover:shadow-md active:scale-95 
              active:bg-opacity-80 md:px-6 md:py-4 md:text-base"
                onClick={subscribeUser}
              >
                Qo&apos;shilish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
