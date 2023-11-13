// 쿠키 오류 줄이기 위한 코드 추가
// const requestOptions = {
//   method: 'GET', // 요청 방법
//   mode: 'cors', // CORS 설정을 사용합니다.
//   credentials: 'omit', // 해당 옵션은 쿠키, HTTP Basic/Digest authentication 등을 보내지 않게 해줍니다.
// };

const GetShowAPI = async setShow => {
  try {
    const response = await fetch(
      '//openapi.seoul.go.kr:8088/774c79676c79686f31303566616f7871/json/culturalEventInfo/1/1',
      // requestOptions,
    );

    if (!response.ok) throw new Error('ERROR');

    const resArray = await response.json();
    const totalNum = resArray.culturalEventInfo.list_total_count;

    const loopCnt = Math.ceil(totalNum / 1000);

    const loadingList = [];
    for (let i = 0; i < loopCnt; i++) {
      const start = 1000 * i + 1;
      const end = start + 999;
      loadingList.push(
        fetch(
          `//openapi.seoul.go.kr:8088/774c79676c79686f31303566616f7871/json/culturalEventInfo/${start}/${end}`,
          // requestOptions,
        ).then(response => {
          if (!response.ok) throw new Error(`ERROR on ${i + 1}`);
          return response.json();
        }),
      );
    }

    const showResponses = await Promise.all(loadingList);

    const allShow = showResponses.flatMap(response => response.culturalEventInfo.row);

    setShow([...allShow]);
  } catch (e) {
    console.error(e);
  }
};

export default GetShowAPI;
