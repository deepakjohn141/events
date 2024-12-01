import HomeStack from './src/components/homeStack/HomeStack';
import AuthStack from './src/components/authStack/AuthStack';
import { StateProvider } from './StateContext';
import { useState, useEffect } from 'react';
import { auth } from './src/database/config';
import { onAuthStateChanged } from "firebase/auth";


export default function App() {
  const [userUid, setUserUid] = useState('')
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        setUserUid(uid)

      } else {
        setUserUid('')
      }
    });

  }, [])
  return (
    <StateProvider>
      {userUid ? <HomeStack /> : <AuthStack />}
    </StateProvider>
  );
}