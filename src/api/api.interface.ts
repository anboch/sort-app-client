// export interface ICategory {
//   _id: string;
//   title: string;
//   __v?: number;
// }

import { feedbackTypes } from '../components/common/constants';
import { ValueOf } from '../components/common/types';

// Request
export interface IConfirmDto {
  email: string;
  confirmCode: string;
}

// Response
export interface IJWTs {
  access_token: string;
  refresh_token: string;
}

export enum TagGroup {
  CATEGORY = 'category',
  CODE = 'code',
  NO = '',
}

export interface ITag {
  _id: string;
  titles: string[];
  group: TagGroup;
}

// export interface IWay {
//   recyclePointID: string;
//   ruleIDs: IRule[];
// }
export interface IRuleSet {
  _id: string;
  recyclePointIDs: string[] | IRecyclePoint[];
  ruleIDs: string[] | IRule[];
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
  // todo. more precisely ruleSetIDs: string[] | IRuleSet[];
  ruleSetIDs: IRuleSet[];
}
export type SimilarMaterial = Pick<IMaterial, '_id' | 'titles'>;

export interface IMaterial {
  _id: string;
  titles: string[];
  tagIDs: ITag[];
  similarMaterialIDs: SimilarMaterial[];
  description: string;
  images: string[];
  typeIDs: IType[] | string[];
  sortedRules: IRuleLists;
}

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IBin {
  _id: string;
  title?: string;
  typeID: IType | string;
  ruleSetID: string | IRuleSet;
}

enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
interface IOpeningHours {
  dayAndNight: boolean;
  weekSchedule?: IDailySchedule[];
}

interface IDailySchedule {
  days: Weekdays[];
  periods: [{ start: string; end: string }];
}
interface IContacts {
  site?: string;
  ecoTaxi?: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}
interface IPosition {
  coordinates: ICoordinates;
  address?: string;
}

interface ICity {
  coordinates: ICoordinates;
  name?: string;
}

export interface IRecyclePoint {
  _id: string;
  title: string;
  description?: string;
  openingHours?: IOpeningHours;
  contacts?: IContacts;
  position: IPosition;
}
export interface IUser {
  _id: string;
  role: Role;
  email: string;
  name?: string;
  binIDs?: string[] | IBin[];
  binCounter?: number;
  recyclePointIDs?: string[] | IRecyclePoint[];
  position?: IPosition;
  city?: ICity;
}

export enum SearchItemKind {
  material = 'material',
  tag = 'tag',
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

export interface IConfirmRequestInfo {
  email: string;
  codeExpirationTime: number;
}

export interface IFeedback {
  _id?: string;
  type: ValueOf<typeof feedbackTypes>;
  description: string;
}

export interface IGeolocation {
  country_code?: string | null;
  country_name?: string | null;
  city?: string | null;
  postal?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  IPv4?: string | null;
  state?: string | null;
}
