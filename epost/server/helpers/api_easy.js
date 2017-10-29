import Easypost from '@easypost/api';

const api = (apiKey = 'j58SufRJD3dBmrf1N29p0w') => new Easypost(apiKey);

export default { api };
