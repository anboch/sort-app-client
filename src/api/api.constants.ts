// after changes need to be synchronized with the back
export const responseErrorMessages = {
  ALREADY_REQUESTED_ERROR: 'Ссылка для подтверждения уже отправлена',
  CODE_EXPIRED: 'Cрок действия кода истек',
  WRONG_CODE: 'Не верный код',
  WRONG_JWT: 'Токен устарел или не действителен',
} as const;

export const queryKeys = {
  user: 'user',
  bins: 'bins',
  type: 'type',
  ruleSet: 'rule-set',
  searchList: 'search-lists',
  recyclePoints: 'recycle-points',
  materialsByType: 'materials-by-type',
} as const;
