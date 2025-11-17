export default function Authorized() {
    const username = "Michi";
    const registered_at = "2022-01-01";

    return <div>
        <span className="text-2xl border-b-1 border-black">Users' Profile:</span>
        <p><span className="font-bold">Username:</span> {username}</p>
        <p><span className="font-bold">Registered at:</span> {registered_at}</p>
    </div>;
}