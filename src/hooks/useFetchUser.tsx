import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getUser } from '../api';

export const useFetchUser = (userId: number | null) => {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string>('');
  const [isUserLoader, setIsUserLoader] = useState<boolean>(false);

  //console.log('userId', userId);

  useEffect(() => {
    setIsUserLoader(true);
    if (userId) {
      getUser(userId)
        .then(data => {
          setFetchedUser(data);
          setIsUserLoader(false);
        })
        .catch(() => setFetchError('Try again later'));
    }
  }, [userId]);

  return {
    fetchedUser,
    fetchError,
    isUserLoader,
  };
};
