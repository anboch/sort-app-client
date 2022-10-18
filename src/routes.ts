export const pageRoutes = {
  search: "/",
  myBins: "/bins",
  recyclePoints: "/recycle-points",
  profile: "/profile",
  about: "/about",
} as const;

export const apiRoutes = {
  fetchSearchList: "/api/searchList",
  requestConfirmCode: "/api/auth/request",
  confirmAndLogin: "/api/auth/confirm",
  getUser: "/api/user",
  updateUser: "/api/user",
  getBins: "/api/bin/all",
  updateBin: "/api/bin",
  getTypeById: "/api/type/by-id/",
  getRuleSetById: "/api/rule-set/by-id/",
  refreshTokens: "/api/auth/refresh",
  logout: "/api/auth/logout",
} as const;
