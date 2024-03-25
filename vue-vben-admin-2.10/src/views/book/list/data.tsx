import { getBookList } from '/@/api/book/book';
import { FormSchema } from '/@/components/Form/index';

export const searchList = async () => {
  const result: any[] = [];
  const data = await getBookList({ page: 1, pageSize: 10 });
  for (let i = 0; i < data.length; i++) {
    result.push({
      id: data.id,
      title: 'Vben Admin',
      description: ['Vben', '设计语言', 'Typescript'],
      content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
      time: '2020-11-14 11:20',
    });
  }
  return result;
};

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '书名',
    colProps: {
      span: 8,
    },
    componentProps: {
      // onChange: (e: any) => {
      //   console.log(e);
      // },
    },
  },
  {
    field: 'author',
    component: 'Input',
    label: '作者',
    colProps: {
      span: 8,
    },
    componentProps: {
      // onChange: (e: any) => {
      //   console.log(e);
      // },
    },
  },
];
