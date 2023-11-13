import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import { showCodeName, showState, showDateForm, showDataTrim } from '../../Utils/showDetailFunction';

const ShowDetailInfo = ({ detailData }) => {
  const detailDataArr = [
    { list: '신청일자', data: detailData.RGSTDATE },
    { list: '공연일자', data: showDateForm(detailData.STRTDATE, detailData.END_DATE) },
    { list: '이용대상', data: detailData.USE_TRGT },
    { list: '이용요금', data: detailData.USE_FEE },
  ];

  return (
    <SShowDtailInfo>
      <h1 className="a11y-hidden">Show Dtail</h1>
      <div className="tags">
        <div>{showCodeName(detailData.CODENAME)}</div>
        <div>{showState(detailData.STRTDATE, detailData.END_DATE)}</div>
      </div>
      <div className="info-txt">
        <h2>{detailData.TITLE}</h2>
        <p className="place">
          {detailData.GUNAME} | {detailData.PLACE}
        </p>
        <ul>
          {detailDataArr.map((data, i) => {
            return (
              <li key={i}>
                <p className="list">{data.list}</p>
                <p>{showDataTrim(data.data)}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <Button size="Large">
        <Link to={detailData.ORG_LINK} target="_blank">상세 페이지</Link>
        <Link to="/postingpage" state={detailData}>
          후기 작성
        </Link>
      </Button>
    </SShowDtailInfo>
  );
};

export default ShowDetailInfo;

const SShowDtailInfo = styled.section`
  z-index: 30;
  width: 390px;
  padding: 25px 34px 10px 34px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 60px;
  .tags {
    display: flex;
    gap: 10px;
    margin-bottom: 7px;
    text-align: center;
    div {
      font-size: 12px;
      padding: 5px 10px;
      background-color: var(--main);
      color: white;
      border-radius: 30px;
    }
  }
  .info-txt {
    line-height: 1.3;
    h2 {
      font-size: 18px;
      font-weight: 900;
      margin-bottom: 10px;
    }
    .place {
      border-bottom: 1px solid var(--gray);
      padding-bottom: 15px;
      margin-bottom: 20px;
      font-size: 12px;
    }
    li {
      display: flex;
      margin-bottom: 10px;
      font-size: 12px;
      .list {
        flex: 0 0 76px;
        color: var(--deepgray);
        &::after {
          content: '|';
          color: var(--gray);
          margin: 0 15px;
        }
      }
    }
  }
  button {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 12px 20px 10px 20px;
  }
  a {
    flex: 1;
    position: relative;
    &:nth-child(2)::before {
      content: '';
      position: absolute;
      top: 60%;
      left: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 130%;
      background-color: #ccc;
    }
  }
`;
