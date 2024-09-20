
export class UpdateMenuDto {
  id: number;
  menuName: string;
  path: string;
  icon: string;
  component: string;
  parentId: number;
  orderNum: number;
  menuType: string;
  createBy: string;
  createTime: Date;
  updateTime: Date;
}
