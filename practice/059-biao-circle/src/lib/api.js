import axios from 'axios';

let appKey = 'e02e228f1fea1ba69135e5ce251ed4288d67490e41a161fee3ef7389dcf4ebf2';
let timestamp = Date.now();

function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}

export default function api(url, data) {
    return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
        headers: {
            'BIAO-MOCK-APP-KEY': appKey,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
        },
    }).then(r => {
        return r.data;
    })
}

