export class TfsRespWiql {
  queryType: string;
  queryResultType: string;
  asOf: Date;
  columns: TfsRespWiqlItem[];
  sortColumns:TfsRespWiqlSortCols[];
  workItems: TfsRespWiqlWit[];
}

class TfsRespWiqlSortCols{
  field: TfsRespWiql;
  descending: boolean;
}

class TfsRespWiqlItem{
  referenceName: string;
  name: string;
  url: string;
}

class TfsRespWiqlWit{
  id: number;
  url: string;
}
