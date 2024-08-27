export class CreateOrangizationDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  logo?: string;
  parent_id?: string;
  class?: string;
  status?: string;
  leader?: string;
  sort?: string;
  create_time?: Date;
  update_time?: Date;
}
