
export interface MetaModel {
  code: string;
  field: string | null;
  message: string;
}

export interface DataModel {
  currentPage: number,
  noRecordInPage: number,
  results: object[],
  totalPage: number,
  totalRecords: number,
  countRecords: number,
}

export interface HttpClienRequest {
  page: number;
  size: number;
  column?:string;
  sort?:string;
}

export interface HttpClientResponse {
  data: DataSearchModel | any;
  errors: object[];
  meta: MetaResponseModel | any;
}

export class DataSearchModel implements DataModel {
  public constructor(
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results = [],
    public totalPage: number = 0,
    public totalRecords: number = 0,
    public countRecords: number = 0
  ) { }
}

export class MetaResponseModel implements MetaModel {
  public constructor(
    public code: string,
    public field: string | null,
    public message: string
  ) {}
}

