import axios from 'axios'

const proxyRequest = axios.create({
    baseURL: 'http://localhost:3000',
})

export const apiLogin = params => proxyRequest.get('/login', params)
export const apiList = params => proxyRequest.get('/list', params)
export const apiDownload = params => proxyRequest.get('/download', params)




