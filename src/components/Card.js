import { useState } from "react";

export default function Card( props ) {
    const [showMore, setShowMore] = useState(false);

    function handleShowMore() {
        if(showMore) {
            setShowMore(false);
        } else {
            setShowMore(true);
        }
    }

    return (
        <>
        <tr className="">
            <td className="item-id">{props.productId}</td>
            <td className="item-dep">{props.department}</td>
            <td className="item-name">{props.name}</td>
            <td className="item-date">{props.dateOfCreation}</td>
            <td className="item-status">{props.status}</td>
            <td className="">
                <button className="item-more-btn" onClick={handleShowMore}>{showMore ? '-' : '+'}</button>
            </td>
        </tr>
        {showMore &&
            <tr className="show-more-row">
                <td colSpan="6">
                    <div className="show-more">
                        <div>Кол-во в программе: {props.programQuantity}</div>
                        <div>Кол-во по факту: {props.factQuantity}</div>
                        <div>Кто создал: {props.whoCreated.firstName + " " + props.whoCreated.lastName}</div>
                    </div>
                </td>
            </tr>
        }
        
        
        </>
    );
}