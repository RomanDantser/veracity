import NavBar from "./NavBar";

export default function AccessDenied() {
    return (
        <>
            <NavBar />
            <div className="access-denied">Доступ запрещен</div>
        </>
    );
}