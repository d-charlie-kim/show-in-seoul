import React, { useState } from 'react';
import styled from 'styled-components';
import TopBarBtn from '../Common/TopBarBtn';
import iconSearch from '../../Assets/Icon/icon-search.svg';

const SearchInput = ({ setKeyword }) => {
  const [inputValue, setInputValue] = useState('');

  // 검색아이콘 핸들러
  const submitButtonHandler = e => {
    e.preventDefault();
    setKeyword(inputValue);
  };

  // 인풋 핸들러
  const submitKeyDownHandler = e => {
    if (e.key === 'Enter') {
      submitButtonHandler(e);
    }
  };

  // value 핸들러
  const valueChangeHandler = e => {
    setInputValue(e.target.value);
  };

  return (
    <SSearchInput>
      {/* onChange 이벤트가 발생하면 inputValue 변경 */}
      <input
        type="text"
        placeholder="행사 검색"
        onKeyDown={submitKeyDownHandler}
        onChange={valueChangeHandler}
        value={inputValue}
      />
      <TopBarBtn type="submit" onClick={submitButtonHandler} icon={iconSearch} alt={'검색'} />
    </SSearchInput>
  );
};

export default SearchInput;

const SSearchInput = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  input {
    width: calc(100% - 30px);
    height: 32px;
    background-color: #f2f2f2;
    border-radius: 30px;
    padding: 0 15px;
    margin-right: 15px;
    &::placeholder {
      color: #c4c4c4;
    }
  }
`;
