import { useAuth0 } from '@auth0/auth0-react';

const getUser = async ({ userEmail }: { userEmail: string }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  try {
    const { getAccessTokenSilently } = useAuth0();

    const token = await getAccessTokenSilently();

    const response = await fetch(`${serverUrl}/protected-message`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
