export const checkLogin = async (endpoint, options) => {
    let data;
    options.method = "POST";
    options.headers = {
        accept: "application/json",
    };
    const controller = new AbortController();
    options.signal = controller.signal;
    options.body = JSON.stringify(options.body);

    setTimeout(() => controller.abort(), 1000);

    try {
        let response = await fetch(endpoint, options);
        if (!response.success) throw Error("Network request failed");
    } catch (e) {}
};
