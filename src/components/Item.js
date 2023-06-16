import { useState, useContext } from "react";
import { userContext } from "@/lib/userContext";

export default function Card(props) {
    const [showMore, setShowMore] = useState(false);
    const [comment, setComment] = useState("");
    const { user } = useContext(userContext);

    function handleShowMore() {
        if(showMore) {
            setShowMore(false);
        } else {
            setShowMore(true);
        }
    }

    return (
        <>
        <tr>
            <td className="item-id">{props.productId}</td>
            <td className="item-dep">{props.department}</td>
            <td className="item-name">{props.name}</td>
            <td className="item-date">{props.dateOfCreation}</td>
            <td className="item-status">{props.status}</td>
            <td>
                <button className="item-more-btn" onClick={handleShowMore}>{showMore ? '-' : '+'}</button>
            </td>
        </tr>
        {showMore &&
            <>
                <tr className="show-more-row-info">
                    <td colSpan="6">
                        <div className="show-more">
                            <div>Кол-во в программе: {props.programQuantity}</div>
                            <div>Кол-во по факту: {props.factQuantity}</div>
                            <div>Кто создал: {props.whoCreated.firstName + " " + props.whoCreated.lastName}</div>
                        </div>
                    </td>
                </tr>
                    <tr className="show-more-row">
                        <td colSpan="6">
                            <div className="show-more">
                                {props.comment && <div>Комментарий: {props.comment}</div>}
                                {!props.comment && <div>Комментарий отсутствует</div>}
                                {props.status == "Завершена" && props.onCloseComment && <div>Комментарий логистики: {props.onCloseComment}</div>}
                                {user.subdivision === "Логистика" && props.status === "Создана" && <button onClick={() => {props.startItem(props.itemId)}} className="show-more-start">Начать заявку</button>}
                            </div>
                        </td>
                    </tr>
                    {user.subdivision === "Логистика" && props.status === "В работе" &&
                        <tr className="show-more-row">
                            <td colSpan="6">
                                <div className="show-more">
                                    <div className="show-more-input">
                                        <label>Комментарий логистики</label>
                                        <textarea onChange={(e) => {setComment(e.target.value)}} rows="1" cols="50" type="text" />
                                    </div>
                                    <button onClick={() => {props.closeItem(props.itemId, comment)}} disabled={comment ? false : true}>Завершить заявку</button>
                                </div>
                            </td>
                        </tr>
                    }
            </>
        }
        </>
    );
}