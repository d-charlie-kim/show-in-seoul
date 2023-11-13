import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileImageEdit from './ProfileImageEdit';
import InputBox from './InputBox';
import ProfileInterests from '../Profile/ProfileInterests';
import { InfoWarning, MyAccountName } from '../../Atom/atom';
import { useRecoilValue } from 'recoil';
import { IsValidAccountAPI } from '../../API/User';

const ProfileInfoEdit = ({ introGenerator, setIsValidInputs, profile, setProfile }) => {
  const [validAccountName, setValidAccountName] = useState(true);
  const [validUserName, setValidUserName] = useState(true);
  const [userNameFailedMsg, setUserNameFailedMsg] = useState('');
  const [AccountnameFailedMsg, setAccountnameFailedMsg] = useState('');
  const warning = useRecoilValue(InfoWarning);
  const myAccountName = useRecoilValue(MyAccountName);

  const isValidAccountName = async () => {
    const regExp = /^[a-zA-Z0-9_.]*$/;

    if (myAccountName === profile.accountname) {
      setValidAccountName(true);
      setAccountnameFailedMsg('');
      return;
    }

    if (!regExp.test(profile.accountname)) {
      setValidAccountName(false);
      setAccountnameFailedMsg('영문, 숫자, 특수문자(_),(.)만 사용 가능합니다.');
      return;
    }
    const response = await IsValidAccountAPI(profile.accountname);
    if (response.message === '사용 가능한 계정ID 입니다.') {
      setValidAccountName(true);
      setAccountnameFailedMsg('');
    } else {
      setValidAccountName(false);
      setAccountnameFailedMsg(response.message);
    }
  };

  const isValidUserName = () => {
    if (profile.username.length >= 2 && profile.username.length <= 10) {
      setValidUserName(true);
      setUserNameFailedMsg('');
    } else {
      setValidUserName(false);
      setUserNameFailedMsg('사용자 이름은 2~10자 이내여야 합니다.');
    }
  };

  useEffect(() => {
    if (validAccountName && validUserName) {
      setIsValidInputs(true);
    } else {
      setIsValidInputs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validAccountName, validUserName]);

  return (
    <SProfileInfoEdit>
      <div className="profile-edit-header">
        <ProfileImageEdit profile={profile} setProfile={setProfile} />
      </div>
      <div className="profile-edit-info">
        <InputBox
          value={profile.username}
          title="사용자 이름"
          id="userNamee"
          onChange={e => {
            setProfile({ ...profile, username: e.target.value });
          }}
          placeholder="2~10자 이내여야 합니다."
          FailedMessage={userNameFailedMsg}
          onBlur={isValidUserName}
        />
        <InputBox
          value={profile.accountname}
          title="계정 ID"
          id="accountId"
          onChange={e => {
            setProfile({ ...profile, accountname: e.target.value });
          }}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          FailedMessage={AccountnameFailedMsg}
          onBlur={isValidAccountName}
        />
        <InputBox
          warning={warning}
          title="취향"
          id="interests"
          disabled={true}
          placeholder="최대 4개까지 선택할 수 있습니다."
        />
        <ProfileInterests profile={profile} introGenerator={introGenerator} />
      </div>
    </SProfileInfoEdit>
  );
};

export default ProfileInfoEdit;

const SProfileInfoEdit = styled.div`
  .profile-edit-header {
    padding: 20px 0 20px 0;
  }

  .profile-edit-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 325px;
    margin-bottom: 50px;
    gap: 30px;
  }
`;
