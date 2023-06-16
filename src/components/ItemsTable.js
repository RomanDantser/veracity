import { useEffect, useState } from "react";

import Item from "./Item";
import Loading from "./Loading";
import { AUTH_API_URL } from "@/lib/authorization";

export default function ItemsTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [itemsData, setItemsData] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        try {
            const response = await fetch(`${AUTH_API_URL}/get-items`, {
                credentials: 'include'
            });
            const data = await response.json();
            setIsLoading(false);
            setItemsData(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function startItem(itemId) {
        try {
            const response = await fetch(`${AUTH_API_URL}/start-item`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({itemId})
            });

            const creatingResult = await response.json();
            if(creatingResult.error) {
                console.log(creatingResult);
            }
            getItems();

        } catch (err) {
            console.error(err);
        }
    }

    async function closeItem(itemId, comment) {
        try {
            const response = await fetch(`${AUTH_API_URL}/close-item`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({itemId, comment})
            });

            const creatingResult = await response.json();
            if(creatingResult.error) {
                console.log(creatingResult);
            }
            getItems();

        } catch (err) {
            console.error(err);
        }
    }

    function onSetFilters() {
        // TODO
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
            <table className='items-table'>
                <thead>
                    <tr className='items-contents'>
                        <th>Артикул</th>
                        <th>Отдел</th>
                        <th>Название</th>
                        <th>Дата создания</th>
                        <th>Статус</th>
                        <th>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#FFFFFF"/>
                            </svg>
                        </th>
                    </tr>
                </thead>
                {isLoading && <tbody><tr><td colSpan="6"><Loading/></td></tr></tbody>}
                {!isLoading &&
                <tbody>
                    {(!itemsData || !itemsData.length) &&
                        <tr>
                            <td colSpan="6">
                                Нет данных для отображения
                            </td>
                        </tr>
                    }
                    {itemsData && itemsData.map(item => {
                        return (<Item
                            productId = {item.productInfo.id}
                            department = {item.productInfo.department}
                            name = {item.productInfo.name}
                            dateOfCreation = {fromStringToLocalDate(item.dateOfCreation)}
                            status = {item.status}
                            whoCreated = {item.whoCreated}
                            comment = {item.comment}
                            programQuantity = {item.programQuantity}
                            factQuantity = {item.factQuantity}
                            itemId = {item._id}
                            onCloseComment ={item.onCloseComment}
                            startItem = {startItem}
                            closeItem = {closeItem}
                            key = {Number(item.productInfo.id) * new Date(item.dateOfCreation)}
                            />)
                    })}
                </tbody>
                }
            </table>
        </>
    );
}
