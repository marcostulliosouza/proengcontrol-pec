import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userApi';

export const useUsers = () => {
  const [user, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return user;
};