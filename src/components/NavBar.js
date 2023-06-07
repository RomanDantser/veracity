import { userContext } from "@/lib/userContext";
import Link from "next/link";
import { useContext } from "react";

export default function NavBar() {
  const { user } = useContext(userContext)

    return (
        <div className='nav-bar'>
          <div className="main-link">
            <Link href="/">Аномалии_Склада</Link>
          </div>
          {user && 
          <div className="nav-items">
            <div className="nav-item name">
              Привет, {`${user.firstName} ${user.lastName}`}
              </div>
            <div className="nav-item">
              <Link href="/create">Создать заявку</Link>
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