export class TfsRespProjects {
  count: number;
  value: TfsRespProjectItem[];

  
}

class TfsRespProjectItem {
  id: string;
  name: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
}
