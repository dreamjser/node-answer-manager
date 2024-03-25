export const responseData = (errorCode: string, errorMsg?: any, data?: any) => {
  return {
    errorCode,
    errorMsg: errorMsg || (errorCode === '0'? '请求成功': '请求失败'),
    data,
  }
}
