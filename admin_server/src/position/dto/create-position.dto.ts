export class CreatePositionDto {
  id?: string;
  name: string;
  parent_id?: string;
  affiliated_org?: string;
  status?: string;
  leader?: string;
  sort?: string;
  description?: string;
  create_time?: Date;
  update_time?: Date;
}
