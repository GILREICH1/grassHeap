/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../../common/types';
import { SERVER_URL as base_url } from '../../utils/config';
import Loader from '../Loader/Loader';

const initialUser = { userEmail: '' };

interface UserContxt {
  user: User;
}

export const userContxt = createContext<UserContxt>({
  user: initialUser,
});

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
  const [localUser, setLocalUser] = useState(initialUser);
  const { user, getAccessTokenSilently, isLoading } = useAuth0();

  const getUser = async ({ userEmail }: { userEmail: string }) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${base_url}/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail }),
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      getUser({ userEmail: user.email }).then(user => {
        console.log('returned user', user);
        setLocalUser(user);
      });
    }
  }, [isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <userContxt.Provider value={{ user: localUser }}>
      {children}
    </userContxt.Provider>
  );
};

export default UserContext;
