import { useEffect, useState } from "react";
import { io, Manager } from "socket.io-client";
const url = "http://172.30.4.55:3000";

function App() {
    const [ioSocket, setIoSocket] = useState(null);

    useEffect(() => {
        const socket = io(url);
        setIoSocket(socket);
        socket.on("chatMsg", (msg) => {
            console.log(msg);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return (
        <>
            <h1>Splimeet</h1>
            <button
                onClick={() => {
                    ioSocket.emit("chatMsg", "hola");
                }}
            >
                Hola
            </button>
        </>
    );
}

export default App;
