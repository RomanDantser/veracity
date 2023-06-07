import { useState, useContext } from "react";
import { validateUserOnRegister } from '@/lib/validators';
import { AUTH_API_URL } from "@/lib/authorization";
import { userContext } from "@/lib/userContext";

export default function Auth() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [LDAP, setLDAP] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState(1);
    const [subdivision, setSubdivision] = useState("Коммерция");
    const [isSigningUp, setIsSigningUp] = useState(true);
    const [inputError, setInputError] = useState(null);

    const { setUser } = useContext(userContext);

    function handleBtnAuthChange(event) {
        event.preventDefault();
        setInputError(null);
        setIsSigningUp(!isSigningUp);
    }

    async function handleLogIn(event, userInfo) {
        event.preventDefault();

        if(!userInfo) {
            setInputError({message: "Введите ЛДАП и пароль"})
        }

        const response = await fetch(`${AUTH_API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        const data = await response.json();

        if(data.error) {
            setInputError({message: data.error});
        } else {
            setUser(data);
        }

    }
  
    async function handleSignUp(event, userInfo) {
      event.preventDefault();
      const inputCheck = validateUserOnRegister(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.LDAP,
        userInfo.department,
        userInfo.subdivision,
        userInfo.password
      );
    
      if (inputCheck.message !== "OK") {
        setInputError(inputCheck)
      } else {
        const response = await fetch(`${AUTH_API_URL}/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
          })
    
          const data = await response.json()
          if(data.error) {
            setInputError({message: data.error})
          } else {
            setUser(data);
          }
      }
    }
    
    return (
        <>
            {isSigningUp &&
                <form className="auth-form">
                    <label htmlFor="LDAP">LDAP</label>
                    <input type="number" id="LDAP" value={LDAP} onChange={e => setLDAP(e.target.value)}/>
                    <label htmlFor="firstName">Имя <i>(кириллица)</i></label>
                    <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <label htmlFor="lastName">Фамилия <i>(кириллица)</i></label>
                    <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <label htmlFor="paswd">Пароль <i>(минимум 6 символов)</i></label>
                    <input type="password" id="paswd" value={password} onChange={e => setPassword(e.target.value)}/>
                    <label>Выберете подразделение</label>
                    <select onChange={e=>setSubdivision(e.target.value)}>
                        <option>Коммерция</option>
                        <option>Логистика</option>
                    </select>
                    {subdivision === "Коммерция" &&
                        <>
                        <label htmlFor="department">Отдел</label>
                        <select id="department" onChange={e => setDepartment(Number(e.target.value))}>
                            {[...Array(15).keys()].map(num => {
                                return (<option key={num}>{num + 1}</option>)
                            })}
                        </select>
                        </>
                    }
                    {inputError && 
                        <div>{inputError.message}</div>
                    }
                    <div className="form-btn-row">
                        <button id="logIn" onClick={e => handleSignUp(e, {
                            firstName,
                            lastName,
                            LDAP,
                            password,
                            department,
                            subdivision
                        })}>Зарегистрироваться</button>
                        <button className="form-btn-change" onClick={e=> handleBtnAuthChange(e)}>Войти в аккаунт</button>
                    </div>
                </form>
            }
            {!isSigningUp &&
                <form className="auth-form">
                    <label htmlFor="LDAP">LDAP</label>
                    <input type="number" id="LDAP" value={LDAP} onChange={e => setLDAP(e.target.value)}/>
                    <label htmlFor="paswd">Пароль</label>
                    <input type="password" id="paswd" value={password} onChange={e => setPassword(e.target.value)}/>
                    {inputError && 
                        <div>{inputError.message}</div>
                    }
                    <div className="form-btn-row">
                        <button type="submit" onClick={e => handleLogIn(e, { LDAP, password})}>Войти</button>
                        <button className="form-btn-change" onClick={e=> handleBtnAuthChange(e)}>Создать аккаунт</button>
                    </div>
            </form>
            }
        </>
    )
}