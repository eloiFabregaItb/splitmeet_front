import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async (url) => {
            try {
                let response = await fetch(url);

                if (!response.success) {
                    throw {
                        success: false,
                        err_code: response.error_code,
                        msg: !response.msg ? "Ocurrió un error" : response.msg,
                    };
                }

                let json = await response.json();
                setIsPending(false);
                setData(json);
                setError(null);
            } catch (err) {
                setIsPending(true);
                setError(err);
            }
        };

        getData(url);
    }, [url]);

    return { data, isPending, error };
};
