const users = [
    { id: '1', name: 'John' }, //
    { id: '2', name: 'Bill' },
    { id: '3', name: 'Jane' },
];

export const getUsers = () => users;
export const getUserById = (id: string) => users.filter((u) => String(u.id) === String(id))[0];
