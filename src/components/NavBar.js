import { useContext } from "react";

import { AUTH_API_URL } from "@/lib/authorization";
import { userContext } from "@/lib/userContext";
import Link from "next/link";

export default function NavBar() {
  const { user, setUser } = useContext(userContext);

  async function onLogout() {
    try {
      const response = await fetch(`${AUTH_API_URL}/logout`, {credentials: 'include'});
      const res = await response.json();
      if (res.message === 'ok') {setUser(null)}
    } catch (err) {
      console.error(err);
    }
  }

    return (
        <div className='nav-bar'>
          <div className="main-link">
            <Link href="/">Аномалии_Склада</Link>
          </div>
          {user && 
          <div className="nav-items">
            <div className="nav-item">
              <Link href="/create">Создать заявку</Link>
            </div>
            <div className="nav-item name">
              Привет, {`${user.firstName} ${user.lastName}`}
            </div>
            <div className="nav-item">
                <Link onClick={onLogout} href="/">Выйти</Link>
            </div>
            {user.subdivision === 'admin' && 
              <div className="nav-item">
                <Link href="/manager">Панель управления</Link>
              </div>
            }
          </div>
          }
      </div>
    );
}