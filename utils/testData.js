/**
 * TestData - Centralized test data management
 */
export class TestData {
  static VALID_USER = {
    user: 'student',
    password: 'Password123',

  };

  static INVALID_USER = {
    user: 'invaliduser',
    password: 'WrongPassword123!',
  };

  static ERROR_MESSAGE = {
    passwordError : 'Your password is invalid!',
    usernameError : 'Your username is invalid!',
  };

  constructor() {
    this.user = TestData.VALID_USER;
    this.invalid_user = TestData.INVALID_USER;
  }

  /**
   * Get random user data
   */
  getRandomUser() {
    return {
      email: `user_${Date.now()}@example.com`,
      password: 'TestPassword123!',
      firstName: 'Random',
      lastName: 'User',
    };
  }

  /**
   * Get test account by ID
   */
  getAccountById(id) {
    return this.accounts.find(acc => acc.id === id);
  }

  /**
   * Get all test accounts
   */
  getAllAccounts() {
    return this.accounts;
  }
}
