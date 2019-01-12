import axios from 'axios';

let appKey = '54a99ad3dbfb7619805072a24151276237c9076f5ddb7cecd82c8747572bfab9';
let timestamp = Date.now();

function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}

export default function api(url, data) {
    return axios.post(`http://mock.biaoyansu.com/api/1/${url}`, data, {
        headers: {
            'BIAO-MOCK-APP-KEY': appKey,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
        },
    }).then(r => {
        return r.data;
    })
}

