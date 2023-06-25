import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

// 공통 컴포넌트
import TopBar from '../Components/Common/TopBar';
import Profile from '../Components/Common/Profile';
import PostLayoutButtons from '../Components/Common/Post/PostLayoutButtons';
import Post from '../Components/Common/Post/Post';
import BottomNav from '../Components/Common/BottomNav';

// recoil
import { MyAccountName } from '../Atom/atom';
import { useRecoilValue } from 'recoil';

// API
import { GetUserPostAPI } from '../API/PostAPI';

const ProfileDetailPage = () => {
  // 리코일에 저장된, 지금 로그인 한 계정 이름
  const getMyAccountName = useRecoilValue(MyAccountName);
  console.log(getMyAccountName);

  // 게시글 헤더를 눌렀을 때, 그 게시글 작성자의 계정 이름
  // 바텀 내비에서 눌렀을 경우도 있기 때문에 let으로 선언
  let otherAccountName = useLocation().state;
  // 게시글 페이지에서 바텀네비에서 프로필 버튼을 눌렀을 경우에는
  // 무조건 내 프로필로 가야해서 BottomNav.jsx에서 내 accountname 전달
  // 객체 형태로 전달되기 때문에 조건문 추가
  if (otherAccountName === { GetMyAccountName: getMyAccountName }) {
    otherAccountName = otherAccountName.GetMyAccountName;
  }

  const postsData = GetUserPostAPI(otherAccountName);

  return (
    // getMyAcoountName과 accountname이 같을 경우,
    // 내 프로필이라는 의미니 탑바에 로그아웃 버튼이 있어야 한다
    // 다를 경우, 다른 유저 프로필이니 로그아웃 버튼을 없앤다
    <>
      {getMyAccountName === otherAccountName ? <TopBar leftEl="back" rightEl="logout" /> : <TopBar leftEl="back" />}
      <SProfileWrapper>
        <Profile accountname={otherAccountName} />
        <PostLayoutButtons />
        {postsData.length > 0 ? (
          postsData.map(postsData => <Post postsData={postsData} />)
        ) : (
          <li style={{ display: 'none' }} className="noContent">
            게시글이 존재하지 않습니다.
          </li>
        )}
      </SProfileWrapper>
      <BottomNav />
    </>
  );
};

export default ProfileDetailPage;

const SProfileWrapper = styled.div`
  height: calc(100vh - 109px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
