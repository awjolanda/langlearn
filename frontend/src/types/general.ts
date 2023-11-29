export interface BaseCourse {
  name: String;
  description: String;
}

export interface Course extends BaseCourse {
  id: Number;
  creation_date?: Date;
  creator_id?: Number;
}

export interface ObjectWithId {
  id: Number;
  [key: string]: any;
}
