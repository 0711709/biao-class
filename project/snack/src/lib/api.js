import axios from 'axios';

let appKey = '3625bc2df9f51babd0d651bef817667d6ab61c9bfdfac059045baa308aabcd81';
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

