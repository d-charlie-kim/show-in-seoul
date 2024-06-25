import { useRecoilValue } from 'recoil';
import { Token } from '../Atom/atom';
const URL = process.env.URL;

const useProfile = () => {
  const getMyToken = useRecoilValue(Token);

  const GetMyProfileAPI = async () => {
    try {
      const req = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getMyToken,
        },
      };

      const response = await fetch(URL + '/user/myinfo', req);

      if (!response.ok) throw new Error('프로필 정보 불러오기 에러');

      return await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const EditProfileAPI = async profile => {
    try {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getMyToken,
        },
        body: JSON.stringify({ ...profile }),
      };

      const response = await fetch(URL + '/user', req);

      if (!response.ok) throw new Error('프로필 수정 에러');

      return await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  return { GetMyProfileAPI, EditProfileAPI };
};

export default useProfile;
