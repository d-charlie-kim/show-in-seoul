import { LoginAPI } from '../API/User';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AdminAccount, AdminToken } from '../Atom/atom';

const useUpdateToken = () => {
  const adminAccount = useRecoilValue(AdminAccount);
  const setAdminToken = useSetRecoilState(AdminToken);

  const updateAdminToken = async () => {
    try {
      const data = await LoginAPI({
        user: {
          email: adminAccount.email,
          password: adminAccount.password,
        },
      });

      setAdminToken(data.user.token);
    } catch (e) {
      console.error(e);
    }
  };

  return { updateAdminToken };
};

export default useUpdateToken;
