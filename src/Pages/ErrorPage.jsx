import React from 'react';
import styled from 'styled-components';
import Error from '../Components/Common/Error';
import { useLocation } from 'react-router-dom';

const ErrorCheck = ({ errorCheck }) => {
  // 메인페이지, 검색페이지를 통하지 않고 ShowDetailPage에 접근하는 경우
  if (errorCheck === 'invalidAccess') {
    return <Error text="잘못된 접근경로 입니다 :(" buttonStyle="invalidAccess"></Error>;
  }
  // errorCheck 에 '/' 로 시작하는 경로 정보가 들어왔을 경우 : 토큰 에러
  else if (errorCheck && errorCheck.startsWith('/')) {
    return <Error text="잘못된 접근경로 입니다 :(" buttonStyle="tokenError"></Error>;
  }
  // 위 사항에서 찾을 수 없는 경우의 모든 에러
  else {
    return <Error text="페이지를 찾을 수 없습니다 :(" buttonStyle="404"></Error>;
  }
};

const ErrorPage = () => {
  // error 가 나오기 이전 페이지 정보 확인
  const errorCheck = useLocation().state;

  return (
    <SContainer>
      <ErrorCheck errorCheck={errorCheck} />
    </SContainer>
  );
};

export default ErrorPage;

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
