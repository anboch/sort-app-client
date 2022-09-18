export const pageRoutes = {
  search: "/",
  myBins: "/bins",
  recyclePoints: "/recycle-points",
  profile: "/profile",
  about: "/about",
} as const;

export const apiRoutes = {
  fetchSearchList: "/searchList",
  requestConfirmCode: "/auth/request",
  confirmAndLogin: "/auth/confirm",
  getUser: "/user",
  updateUser: "/user",
  getBins: "/bin/all",
  updateBin: "/bin",
  getTypeById: "/type/by-id/",
  getRuleSetById: "/rule-set/by-id/",
  refreshTokens: "/auth/refresh",
  logout: "/auth/logout",
} as const;
