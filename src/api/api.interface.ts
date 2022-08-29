// export interface ICategory {
//   _id: string;
//   title: string;
//   __v?: number;
// }

export enum TagGroup {
  CATEGORY = "category",
  CODE = "code",
  NO = "",
}

export interface ITag {
  _id: string;
  titles: string[];
  group: TagGroup;
}

export interface IWay {
  recyclePointID: string;
  ruleIDs: IRule[];
}

export interface IRule {
  _id: string;
  description: string;
}

interface IRuleWithCounter extends IRule {
  numberOfRef: number;
}

interface IRuleLists {
  generalRules: IRuleWithCounter[];
  localRules: IRuleWithCounter[];
}

export interface IType {
  _id: string;
  title: string;
  ways: IWay[];
}
export type SimilarMaterial = Pick<IMaterial, "_id" | "titles">;

export interface IMaterial {
  _id: string;
  titles: string[];
  tagIDs: ITag[];
  similarMaterialIDs: SimilarMaterial[];
  description: string;
  images: string[];
  typeIDs: IType[];
  sortedRules: IRuleLists;
}

export enum SearchItemKind {
  material = "material",
  tag = "tag",
}

export interface IUnionListItem {
  _id: string;
  title: string;
  kind: SearchItemKind;
}

export interface ISearchLists {
  materialsObj: { [key: string]: IMaterial };
  tags: ITag[];
  union: IUnionListItem[];
}
