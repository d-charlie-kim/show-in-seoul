import { useRecoilValue } from 'recoil';
import { AdminToken } from '../Atom/atom';
const URL = process.env.URL;

const useAdmin = () => {
  const getAdminToken = useRecoilValue(AdminToken);

  const FollowAPI = async accountname => {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getAdminToken,
        },
      };

      const response = await fetch(URL + '/profile/' + accountname + '/follow', req);

      // if (!response.ok) throw new Error('Admin 팔로우 에러');

      return await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const GetFeedAPI = async () => {
    try {
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getAdminToken,
        },
      };

      const response = await fetch(URL + '/post/feed', req);

      if (!response.ok) throw new Error('Admin 팔로우 에러');

      return await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  return { GetFeedAPI, FollowAPI };
};

export default useAdmin;
