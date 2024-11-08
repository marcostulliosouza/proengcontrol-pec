import { useEffect, useState } from 'react';
import { getUsersList } from '../api/userApi';

export const useUsers = () => {
  const [user, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsersList();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return user;
};