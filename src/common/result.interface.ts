// 定义通用的API接口返回数据类型
export interface Result {
  errorCode: string | number;
  errorMsg: string;
  data?: any;
}
