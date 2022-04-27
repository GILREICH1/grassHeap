/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../../common/types';
import { SERVER_URL as base_url } from '../../utils/config';
import Loader from '../Loader/Loader';

const initialUser: User = {
  userEmail: '',
  familyName: '',
  givenName: '',
  userPlants: [],
  userTasks: [],
};

interface UserContxt {
  user: User;
  isAuthenticated: boolean;
}

export const userContxt = createContext<UserContxt>({
  user: initialUser,
  isAuthenticated: false,
});

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
  const [localUser, setLocalUser] = useState<User>(initialUser);
  const { user, getAccessTokenSilently, isLoading, isAuthenticated } =
    useAuth0();

  const getUser = async (userEmail: string) => {
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

      const responseData: User = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      getUser(user.email).then(res => {
        if (res) setLocalUser(res);
      });
    }
  }, [isLoading, user]);

  return isLoading ? (
    <Loader />
  ) : (
    <userContxt.Provider value={{ user: localUser, isAuthenticated }}>
      {children}
    </userContxt.Provider>
  );
};

export default UserContext;
