<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuList } from '/@/api/demo/system';
  import { createMenu, updateMenu } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      let menuList;

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuList();
        menuList = treeData;
        updateSchema({
          field: 'pid',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      function checkAllChildrenMenuDisabled(updateMenu) {
        const id = updateMenu.id;
        let isAllDisabled = true;
        // 查询二级菜单
        const subMenu = menuList.filter((item) => item.pid === id);
        console.log(subMenu);
        subMenu.forEach((menu) => {
          if (+menu.active === 1) {
            isAllDisabled = false;
            return;
          }
        });
        if (!isAllDisabled) {
          return false;
        }

        // 查询三级菜单
        subMenu.forEach((menu) => {
          isAllDisabled = checkAllChildrenMenuDisabled(menu);
          if (!isAllDisabled) {
            return;
          }
        });
        return isAllDisabled;
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);

          // 菜单提交（新增、编辑）
          const isUpdateForm = unref(isUpdate);
          if (isUpdateForm) {
            const id = menuList.find((item) => values.name === item.name).id;
            values.id = id;

            // 判断：所有子菜单关闭后，主菜单才能关闭
            const ret = checkAllChildrenMenuDisabled(values);
            if (ret) {
              try {
                await updateMenu({ data: values });
                createMessage.success('菜单修改成功！');
              } catch (e) {
                console.error(e);
              }
            } else {
              createMessage.warning('必须关闭所有子菜单后，才能关闭主菜单');
            }
          } else {
            try {
              await createMenu({ data: values });
              createMessage.success('菜单添加成功！');
            } catch (e) {
              console.error(e);
            }
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
