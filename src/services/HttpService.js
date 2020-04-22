import axios from 'axios';
import storageService from './StorageService';

export const baseUrl = 'https://bazarti.com/';

const httpService = {
    async httpPostUAA(url, data) {
        var headers = { 'Content-Type': 'application/json' }
        const res = await axios.post(baseUAA + url, data, { headers: headers });
        return await res;
    },
    async httpGetUAA(url) {
        const res = await axios.get(baseUAA + url);
        // console.log(res);
        return res;
    },
    async httpPost(url, data) {
        console.log('__ HTTP __ post requests url is ', baseUrl + url)
        const res = await axios.post(baseUrl + url, data);

        return await res;
    },

    async httpGet(url, data) {
        const res = await axios.get(baseUrl + url);
        return await res.data;
    },

    async httpPostJwt(url, data) {
        const token = await storageService.getItem('access_token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json', 'Authorization': AuthStr }
        // console.log('the url is \n')
        // console.log(baseUrl + url, { headers: headers })

        // console.log('the body is \n', data)

        const res = await axios.post(baseUrl + url, data, { headers: headers });
        return res.data;
    },
    
    async httpPutJwt(url, data) {
        const token = await storageService.getItem('access_token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json', 'Authorization': AuthStr }

        // console.log('the put url is \n')
        // console.log(baseUrl + url, { headers: headers })
        // console.log('the put body is \n', data)

        const res = await axios.put(baseUrl + url, data, { headers: headers });
        return res.data;
    }
    
    ,
    async httpGetJwt(url) {
        const token = await storageService.getItem('token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json', 'Authorization': AuthStr }
        const res = await axios.get(baseUrl + url, { headers: headers });
        // console.log(baseUrl + url)
        return await res;
    },
    async httpDeleteJwt(url) {
        const token = await storageService.getItem('access_token');
        // console.log(token)
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json', 'Authorization': AuthStr }
        console.log('the url is', basePhoto + url)
        // console.log(baseUrl + url, { headers: headers })
        const res = await axios.delete(baseUrl + url, { headers: headers });
        return await res;
    },
};

export default httpService;