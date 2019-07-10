// THIS CLASS IS NOT USED ANYMORE, BUT COULD BE USED IF A BACKEND IS USED INSTEAD OF FIREBASE
export class Fetcher {
    public static apiUri = "https://localhost:5001";

    public static get(uri: string) {
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
            .then((response) => response.json());
    }

    public static post(uri: string, body: any) {
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
            .then((response) => response.json());
    }

    public static patch(uri: string, body: any) {
        const request = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
            .then((response) => response.json());
    }

    public static delete(uri: string, body: any) {
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request);
    }
}
