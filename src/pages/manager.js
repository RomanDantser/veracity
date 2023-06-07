import { read, utils } from "xlsx";
import { useState, useContext } from "react";

import NavBar from "@/components/NavBar";
import { userContext } from "@/lib/userContext";
import { AUTH_API_URL } from "@/lib/authorization";

export default function ManagerPage() {
    const [file, setFile] = useState(null);
    const [fileUploadInfo, setFileUploadInfo] = useState(null);

    const { user } = useContext(userContext);

    function handleFileChange(event) {
        if(event.target.files) {
            setFile(event.target.files[0])
        }
    }

    async function handleFileUpload(event) {
        event.preventDefault();

        if(!file) {
            return;
        }

        try {
            const rawFile = await file.arrayBuffer();
            const workBook = read(rawFile);
            const data = utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);

            const response = await fetch(`${AUTH_API_URL}/upload-products`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data})
            });

            const result = await response.json();

            console.log(result);
            
            setFileUploadInfo({
                length: data.length,
                size: rawFile.byteLength
            })
            setFile(null);
        } catch (err) {
            console.error(err);
        }
    }

    if(!user) {
        return (
            <>
                <NavBar/>
                <h1>Доступ запрещен</h1>
            </>
        );
    }

    return (
        <>
            <NavBar></NavBar>
            <form>
                <label htmlFor="file_loader">Загрузка артикулов на сервер:</label>
                <input
                    type="file"
                    id="file_loader"
                    onChange={handleFileChange}
                    accept=".xlsx"
                />
                <button  type="submit" onClick={handleFileUpload}>Загрузить на сервер</button>
            </form>
            {fileUploadInfo && <div>
            Размер:{fileUploadInfo.size} байт, Кол-во строк: {fileUploadInfo.length}
                </div>}
        </>
    );
}