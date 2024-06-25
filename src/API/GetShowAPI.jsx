import axios from 'axios';

const GetShowAPI = async setShow => {
  try {
    const response = await axios.get('https://alone-clovis-d-charlie-kim-89326dd9.koyeb.app/');

    console.log(response);
    if (response.status !== 200) throw new Error('ERROR');

    setShow([...response.data]);
  } catch (e) {
    console.error(e);
  }
};

export default GetShowAPI;
