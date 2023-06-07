import '@/styles/globals.css';

import { userContext } from '@/lib/userContext';
import { useEffect, useState } from 'react';
import { AUTH_API_URL } from '@/lib/authorization';

export default function App({ Component, pageProps: {...pageProps}}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchAuthData() {
      try {
        const response = await fetch(`${AUTH_API_URL}/auth`, {credentials: 'include'});
        if(response) {
          const receivedData = await response.json();
          if(!receivedData.error) {
            setUser(receivedData);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAuthData();
  }, [])
  return (
    <userContext.Provider value={{user, setUser}}>
      <main className='main-screen'>
        <Component {...pageProps}/>
      </main>
    </userContext.Provider>
     
  );
}
