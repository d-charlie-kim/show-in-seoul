import React, { useState } from 'react';
import styled from 'styled-components';
import SInputBox from '../Common/InputBox';
import Button from '../Common/Button';
import { LoginAPI } from '../../API/User';
import { useNavigate } from 'react-router-dom';
import { Token, MyAccountName, IsLoginState } from '../../Atom/atom';
import { useSetRecoilState } from 'recoil';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FailedMessage, setFailedMessage] = useState('');
  const navigate = useNavigate();
  const setUserToken = useSetRecoilState(Token);
  const setMyAccountName = useSetRecoilState(MyAccountName);
  const setIsLoginState = useSetRecoilState(IsLoginState);

  // 비밀번호가 6자 이상인지 검사
  const validatePassword = password => {
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  // input 값이 모두 들어왔는지 확인
  const isValidForm = email.length > 0 && password.length > 0;

  const LoginFunc = async e => {
    e.preventDefault();

    // 이메일 형식 확인
    // const validResult = await IsValidEmailAPI(email);

    // 비밀번호 형식 확인
    if (!password || !validatePassword(password)) {
      setFailedMessage('*비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    // 이메일과 비밀번호 조건 충족 시 로그인 시도
    try {
      const data = await LoginAPI({
        user: {
          email,
          password,
        },
      });

      // 로그인 성공 시 실행할 동작
      const loginSuccess = () => {
        setIsLoginState(1);
        navigate('/mainpage');
      };

      if (data.status === 422) {
        setFailedMessage('*이메일 / 비밀번호를 확인해주세요.');
      } else if (data.user) {
        setUserToken(data.user.token);
        setMyAccountName(data.user.accountname);
        loginSuccess();
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sform onSubmit={LoginFunc}>
        <SInputBox title="이메일" id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <SInputBox
          title="비밀번호"
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          FailedMessage={FailedMessage}
        />
        <Button size="Large" disabled={!isValidForm}>
          로그인
        </Button>
      </Sform>
    </>
  );
}

export default Login;

const Sform = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;

  button {
    margin-top: 2px;
    margin-bottom: 15px;
  }
`;
