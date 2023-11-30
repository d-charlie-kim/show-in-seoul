import axios from 'axios';

const GetShowAPI = async setShow => {
  try {
    const response = await axios.get('https://port-0-show-in-seoul-proxy-server-3szcb0g2blparv3lb.sel5.cloudtype.app');

    console.log(response);
    if (response.status !== 200) throw new Error('ERROR');

    setShow([...response.data]);
  } catch (e) {
    console.error(e);
  }
};

export default GetShowAPI;
