import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
// 공통 컴포넌트
import TopBar from '../Components/Common/TopBar';
// atom
import { Token } from '../Atom/atom';

const PostEditPage = () => {
  const URL = process.env.REACT_APP_URL;
  const [textareaValue, setTextareaValue] = useState('');
  const textRef = useRef();
  const getMyToken = useRecoilValue(Token);
  const postsData = useLocation().state;
  const postsDataArr = postsData.content.split('!#%&@$^))+');
  const navigate = useNavigate();

  // 수정하기 버튼 클릭 시 실행, 게시물 수정 api 호출
  const postUpdate = async () => {
    try {
      const response = await fetch(URL + '/post/' + postsData.id, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getMyToken,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            // textarea에 타이핑 되는 내용들
            content: `${textareaValue}!#%&@$^))+${postsDataArr[1]}!#%&@$^))+${postsDataArr[2]}!#%&@$^))+${postsDataArr[3]}!#%&@$^))+${postsDataArr[4]}!#%&@$^))+${postsDataArr[5]}!#%&@$^))+${postsDataArr[6]}!#%&@$^))+${postsDataArr[7]}!#%&@$^))+${postsDataArr[8]}!#%&@$^))+${postsDataArr[9]}`,
            // 업로드할 사진
            image: postsData.image,
          },
        }),
      });

      const res = await response.json();

      textRef.current.value = '';
      setTextareaValue('');
      // document.querySelector('#imagePre').src = '';

      return res;
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/postpage');
    }
  };

  // textarea에 타이핑 되는 내용들 가져 오는
  const handleInputChange = e => {
    setTextareaValue(e.target.value);
  };

  return (
    <>
      <TopBar leftEl="back" />
      <SForm>
        <SPostingContent>
          <button type="button" disabled={!textareaValue} onClick={postUpdate} className="uploadBtn">
            수정하기
          </button>
          <div className="showDatas">
            <ImageUploadDiv>
              <ul>
                <li>
                  <img id="imagePre" src={postsData.image} alt=""></img>
                </li>
              </ul>
            </ImageUploadDiv>

            <div style={{ paddingLeft: '5px', paddingRight: '5px', marginTop: '210px' }}>
              <p style={{ color: 'salmon', fontSize: '12px', marginTop: '7px' }}>{postsDataArr[1]}</p>
              <p style={{ fontSize: '14px', marginTop: '6px' }}>{postsDataArr[4]}</p>
              <p style={{ fontSize: '11px', marginTop: '6px' }}>
                {postsDataArr[3]} | {postsDataArr[5]}
              </p>
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#767676', fontSize: '11px' }}>신청일자</span>
                <span style={{ fontSize: '11px', marginLeft: '8px' }}>{postsDataArr[6]}</span>
              </div>
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#767676', fontSize: '11px' }}>공연일자</span>
                <span style={{ fontSize: '11px', marginLeft: '8px' }}>{postsDataArr[7]}</span>
              </div>
              <div style={{ marginTop: '4px', borderBottom: '1px solid #dbdbdb', paddingBottom: '7px' }}>
                <span style={{ color: '#767676', fontSize: '11px' }}>이용대상</span>
                <span style={{ fontSize: '11px', marginLeft: '8px' }}>{postsDataArr[8]}</span>
              </div>
            </div>
          </div>
          <UploadTextArea
            defaultValue={postsDataArr[0]}
            required
            className="uploadTextarea"
            onChange={handleInputChange}
            ref={textRef}
            rows="8"
            cols="33"
            placeholder="게시글 입력하기.."></UploadTextArea>
        </SPostingContent>
      </SForm>
    </>
  );
};

export default PostEditPage;

const SForm = styled.form`
  height: calc(100vh - 48px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SPostingContent = styled.div`
  /* margin: 32px 16px; */
  .uploadBtn {
    position: fixed;
    top: 8px;
    margin-left: 268px;
    background-color: var(--main);
    color: white;
    width: 90px;
    height: 32px;
    border-radius: 44px;
    font-size: 14px;
    font-weight: normal;
    z-index: 10;
  }
  .uploadBtn:disabled {
    background-color: #dcb6b6;
  }
  .showDatas {
    padding: 32px 16px 0px;
  }
`;

const ImageUploadDiv = styled.div`
  height: 228px;

  ul {
    li {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 430px;
        object-fit: cover;
        border: none;
        border-radius: 15px;
      }
    }
  }
`;

const UploadTextArea = styled.textarea`
  width: 390px;
  resize: none;
  border: none;
  outline: none;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;
