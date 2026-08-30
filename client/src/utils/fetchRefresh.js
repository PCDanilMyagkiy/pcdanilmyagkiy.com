export async function fetchRefresh(url, options = {}) {
    const ogFetch = async () => {
        return await (await fetch(url, {
            credentials: "include",
            ...options
        })).json();
    }

    let response = await ogFetch();

    if (response.fail === "needRefresh") {
        const refreshResponse = await fetch("/api/accounts/refresh", {
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