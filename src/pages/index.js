import { useContext } from 'react';


import NavBar from '@/components/NavBar';
import ItemsTable from '@/components/ItemsTable';
import Auth from '@/components/Auth';
import { userContext } from '@/lib/userContext';


export default function Home() {
  const { user } = useContext(userContext);

 if(!user) {
  return (
    <>
      <NavBar />
      <Auth/>
    </>
  );
 }
  
  return (
    <>
      <NavBar/>
      <ItemsTable/>
    </>
  )
}
