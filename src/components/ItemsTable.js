import { useContext, useEffect, useState } from "react";

import Card from "./Card";
import { userContext } from "@/lib/userContext";
import { AUTH_API_URL } from "@/lib/authorization";

export default function ItemsTable() {
    const [isLoading, setIsLoading] = useState(false);
    const [itemsData, setItemsData] = useState(null);
    const { user } = useContext(userContext);

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        try {
            const response = await fetch(`${AUTH_API_URL}/get-items`, {
                credentials: 'include'
            });
            const data = await response.json();
            setItemsData(data);
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    function fromStringToLocalDate(date) {
        const dateCheck = (string) => string < 10 ? `0${string}` : string;
        const resultDate = new Date(date);
        const days = dateCheck(resultDate.getDate());
        const month = dateCheck(resultDate.getMonth() + 1);
        const hours = dateCheck(resultDate.getHours());
        const minutes = dateCheck(resultDate.getMinutes());

        return `${days}.${month}.${resultDate.getFullYear()} ${hours}:${minutes}`
    }   

    return (
        <>
        {isLoading && <div className="items-loading">Загрузка...</div>}
            <table className='items-table'>
                <thead>
                    <tr className='items-contents'>
                        <th>Артикул</th>
                        <th>Отдел</th>
                        <th>Название</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                {!isLoading &&
                <tbody>
                    {!itemsData &&
                        <tr>
                            <td colSpan="6">
                                Нет данных для отображения
                            </td>
                        </tr>
                    }
                    {itemsData && itemsData.map(item => {
                        return (<Card
                            productId = {item.productInfo.id}
                            department = {item.productInfo.department}
                            name = {item.productInfo.name}
                            dateOfCreation = {fromStringToLocalDate(item.dateOfCreation)}
                            status = {item.status}
                            whoCreated = {item.whoCreated}
                            programQuantity = {item.programQuantity}
                            factQuantity = {item.factQuantity}
                            key = {item.productInfo.id * item.dateOfCreation}
                            />)
                    })}
                </tbody>
                }
            </table>
        </>
    );
}
