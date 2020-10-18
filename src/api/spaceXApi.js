//https://api.spacexdata.com/v3/launches?limit=100

export function spaceXApi(http) {
    return {
        all1: () => {
            return http.get('/api/v1/spacex');
        },
        default: (url) => {
            let queryString = '';
            if (url) {
                queryString = '&' + url;
            }

            return fetch('https://api.spacexdata.com/v3/launches?limit=100' + queryString).then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json();
            });
            // .then((res) => JSON.parse(res));
        },
        all: (launch_success) => {
            return fetch(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=${launch_success}`).then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json();
            });
            // .then((res) => JSON.parse(res));
        }
    };
}
