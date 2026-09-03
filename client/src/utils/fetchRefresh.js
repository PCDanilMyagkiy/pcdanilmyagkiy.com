const API_URL = import.meta.env.VITE_API_URL;


export async function fetchRefresh(url, options = {}) {
    const ogFetch = async () => {
        return await (await fetch(url, {
            credentials: "include",
            ...options
        })).json();
    }

    let response = await ogFetch();

    console.log(response);

    if (response.fail === "needRefresh") {
        console.log(`${API_URL}/api/accounts/refresh`);

        const refreshResponse = await fetch(`${API_URL}/api/accounts/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const refreshResult = await refreshResponse.json();

        if (refreshResult.success) {
            response = await ogFetch();
        }
    }

    return response;
}