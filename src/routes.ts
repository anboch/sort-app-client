export const pageRoutes = {
  search: "/",
  myBins: "/bins",
  profile: "/profile",
  about: "/about",
} as const;

export const apiRoutes = {
  fetchSearchList: "/api/searchList",
  requestConfirmCode: "/api/auth/request",
  confirmAndLogin: "/api/auth/confirm",
  getUser: "/api/user",
  updateUser: "/api/user",
  deleteUser: "/api/user",
  getBins: "/api/bin/all",
  createBin: "/api/bin/create",
  updateBin: "/api/bin",
  deleteBin: "/api/bin",
  getTypeById: "/api/type/by-id/",
  getRuleSetById: "/api/rule-set/by-id/",
  getRecyclePointsByIds: "/api/recycle-point/by-ids",
  refreshTokens: "/api/auth/refresh",
  logout: "/api/auth/logout",
} as const;
