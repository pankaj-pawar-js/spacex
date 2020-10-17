//https://api.spacexdata.com/v3/launches?limit=100

export function spaceXApi(http) {
    return {
        all: () => {
            return http.get('/api/v1/spacex');
        },

        create: newTodo => {
            return http.post('/api/todos', newTodo);
        }
    };
}
