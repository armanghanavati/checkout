import http from "../httpService";
import config from "../config.json";

//  -> Post clod with file
export const getUploudFile = (uploudFile, values) => {
    return http.post(`${config.localapi}/cloud/file/`, uploudFile, { params: values })
}

//  -> Post clod without app
export const cloudAccMode = () => {
    return http.get(`${config.localapi}/cloud/accessMode`)
}

//  -> Post clod with app
export const cloudAppName = () => {
    return http.get(`${config.localapi}/cloud/appName`)
}

//  -> Reqs list file
export const cloudFileList = () => {
    return http.get(`${config.localapi}/cloud/file`)
}

//  -> Reqs list file
export const cloudFileFilter = (params) => {
    return http.get(`${config.localapi}/cloud/file`, { params: params })
}

//  -> Download file cloud
export const downloadFileCloud = (reqId) => {
    return http.get(`${config.localapi}/cloud/file/download/${reqId}`, { responseType: 'blob' })
}
//ip/cloud/file/download/{ request id }  --> get

