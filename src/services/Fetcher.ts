export class Fetcher {
    static apiUri = "https://localhost:5001";

    static get(uri: string) {
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
            .then(response => response.json())
    }

    static post(uri: string, body: any) {
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
            .then(response => response.json())
    }

    static delete(uri: string, body: any) {
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        };

        return fetch(`${Fetcher.apiUri}/${uri}`, request)
    }
}