import { useContext, useState } from "react";

import NavBar from "@/components/NavBar";
import AccessDenied from '@/components/AccessDenied';

import { userContext } from '@/lib/userContext';
import { AUTH_API_URL } from '@/lib/authorization';


export default function CreatePage() {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [programQuantity, setProgramQuantity] = useState(null);
    const [factQuantity, setFactQuantity] = useState(null);
    const [comment, setComment] = useState(null);
    const [inputError, setInputError] = useState(null);

    const { user } = useContext(userContext);

    async function handleSubmitProduct(event) {
        event.preventDefault();

        if(!productId || !programQuantity || !factQuantity) {
            setInputError("Заполните все необходимые поля");
            return;
        }

        if(productId.length != 8) {
            setInputError("Введите корректный артикул");
            return;
        }

        if(Number(factQuantity) < 0) {
            setInputError("Фактическое кол-во товара не может быть отрицательным");
            return;
        }

        if(factQuantity === programQuantity) {
            setInputError("При наличии аномалий товар в базе и по факту не может быть равным");
            return;
        }

        const currProducts = [...products];
        for (let i = 0; i < currProducts.length; i++) {
            if (currProducts[i].productId === Number(productId)) {
                setInputError("Вы уже добавили товар с таким же артикулом");
                return;
             }
        }
        
        if (inputError) {
            setInputError(null);
        }
        try {
            const response = await fetch(`${AUTH_API_URL}/get-one-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({productId: Number(productId)})
            });
            const product = await response.json();
            if(product.error)  {
                setInputError(product.error);
                return;
            }

            currProducts.push({
                productId: product.id,
                productDBId: product._id,
                department: product.department,
                name: product.name,
                programQuantity: Number(programQuantity),
                factQuantity: Number(factQuantity),
                comment: comment
            })
            setProducts(currProducts);

        } catch (err) {
            console.error(err);
        }
    }

    function handleDelete(productId) {
        if(!products.length) {
            return;
        }
        const currProducts = [...products];
        let index = -1;
        for (let i = 0; i < currProducts.length; i++) {
            if (currProducts[i].productId === productId) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            currProducts.splice(index, 1);
            setProducts(currProducts);
        }
    }
    async function handleUploadProducts(event) {
        event.preventDefault();

        if(!products.length) {
            return;
        }

        try {
            const response = await fetch(`${AUTH_API_URL}/create-items`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(products)
            });

            const creatingResult = await response.json();
            if(creatingResult.error) {
                console.log(creatingResult);
            }

        } catch (err) {
            console.error(err);
        }

        console.log(products);
        
        setProducts([]);
    }

    if (!user) {
        return <AccessDenied />
    }

    return (
        <>
            <NavBar />
            <form className="w-1/2 m-auto p-6 grid grid-rows-9 bg-slate-400">
                <label htmlFor="product_id">Артикул</label>
                <input
                    type="number"
                    inputMode="decimal"
                    id="product_id"
                    onChange={e => setProductId(e.target.value)}
                    />
                <label htmlFor="program_quantity">Числится в торговом зале</label>
                <input
                    type="number"
                    inputMode="decimal"
                    id="program_quantity"
                    onChange={e => setProgramQuantity(e.target.value)}
                    />
                <label htmlFor="fact_quantity">Фактическое кол-во товара</label>
                <input
                    type="number"
                    inputMode="decimal"
                    id="fact_quantity"
                    onChange={e => setFactQuantity(e.target.value)}
                />
                <label htmlFor="comment">Комментарий (опционально)</label>
                <textarea maxLength="30" rows="2" id="comment" onChange={e => setComment(e.target.value)}/>
                {inputError && <div className="create-input-error">{inputError}</div>}
                <button type="submit" onClick={handleSubmitProduct}>Внести товар</button>
            </form>
            <button 
                onClick={handleUploadProducts}
                disabled={products.length ? false : true}
                className='btn-upload'
            >Загрузить на сервер</button>
            {products.length !== 0 && 
                 <table className="create-items">
                    <thead>
                        <tr>
                            <th>Артикул</th>
                            <th>Отдел</th>
                            <th>Название</th>
                            <th>В ТЗ</th>
                            <th>Факт</th>
                            <th>Комментарий</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.productId*product.programQuantity*product.factQuantity}>
                                <td>{product.productId}</td>
                                <td>{product.department}</td>
                                <td>{product.name}</td>
                                <td>{product.programQuantity}</td>
                                <td>{product.factQuantity}</td>
                                <td>{product.comment}</td>
                                <td><button onClick={() => {handleDelete(product.productId)}}>Удалить</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
             </table>
            }
           
        </>
    )
}