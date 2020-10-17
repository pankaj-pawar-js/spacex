export function todosApi(http) {
  return {
    all: () => {
      return fetch('https://api.spacexdata.com/v3/launches?limit=100').then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      });
      // .then((res) => JSON.parse(res));
    },
    all1: () => {
      return http.get('/api/todos');
    },

    create: newTodo => {
      return http.post('/api/todos', newTodo);
    }
  };
}
