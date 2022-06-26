enum StatusMessage {
  INTERNAL_SERVER_ERROR = 'internal server error',
  UNAUTHORIZED = 'Unauthorized',
  EQUAL_TEAMS = 'It is not possible to create a match with two equal teams',
  TEAM_NOT_FOUND = 'There is no team with such id!',
  INCORRECT_CREDENTIALS = 'Incorrect email or password',
  ALREADY_EXISTS = 'email already exists',

  OK = 'ok',
}

export default StatusMessage;
