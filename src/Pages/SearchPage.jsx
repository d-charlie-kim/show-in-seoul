import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopBar from '../Components/Common/TopBar';
import SearchContent from '../Components/Search/SearchContent';
import Error from '../Components/Common/Error';
import BottomNav from '../Components/Common/BottomNav';
import TopBtn from '../Components/Common/TopBtn';
import useScrollToTop from '../Hook/useScrollToTop';
import { Show } from '../Atom/atom';
import { useRecoilValue } from 'recoil';
import TotalCount from '../Components/Article/TotalCount';

const SearchPage = () => {
  const getShow = [...useRecoilValue(Show)];

  // 검색키워드 상태관리 변수
  const [keyword, setKeyword] = useState(null);
  // 검색결과 상태관리 변수
  const [searchResult, setSearchResult] = useState('first');

  useEffect(() => {
    if (keyword) {
      setSearchResult(getShow.filter(obj => obj.TITLE.includes(keyword)));
    } else if (keyword === '') {
      setSearchResult([]);
    }
  }, [keyword]);

  console.log('검색페이지 렌더링...');

  // scroll to top
  const scrollController = useScrollToTop();

  return (
    <>
      {/* 상단바 input에서 값을 활용할 수 있도록 props로 setKeyword 전달*/}
      <TopBar leftEl={'search'} setKeyword={setKeyword} />
      <TotalCount page={'search'} data={searchResult} />
      {searchResult === 'first' ? (
        <Error text={'검색어를 입력해주세요 :)'} />
      ) : searchResult.length !== 0 ? (
        <SSearch>
          <h1 className="a11y-hidden">행사 검색</h1>
          <ul className="searchResult">
            {searchResult.map((data, i) => {
              return <li key={i}>{keyword && <SearchContent data={data} keyword={keyword} />}</li>;
            })}
          </ul>
        </SSearch>
      ) : (
        <Error text={'원하시는 검색 결과가 없습니다 :('} />
      )}
      <TopBtn scrollPosition={scrollController.scrollPosition} sectionLayoutRef={scrollController.sectionLayoutRef} />
      <BottomNav />
    </>
  );
};

export default SearchPage;

const SSearch = styled.section`
  height: calc(100vh - 108px);
  overflow-y: scroll;
  padding: 0 20px;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    cursor: pointer;
    width: 350px;
    padding: 5px;
  }
  .searchResult {
    flex: 1;
    overflow: scroll;
    margin-top: 32px;
    li:not(:last-child) {
      margin-bottom: 10px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
