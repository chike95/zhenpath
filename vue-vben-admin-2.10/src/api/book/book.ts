import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetBookLIST = '/book',
}

/**
 * @description: Get sample options value
 */
export const getBookList = (params) => {
  return defHttp.get<Recordable[]>({ url: Api.GetBookLIST, params });
};
