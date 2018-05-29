export class Constants {

  static LocalStorageKeys = class {
    public static DISH_KEY = 'DISHES';
    public static USER_CREDENTIALS_KEY = 'USER_CRED';
    public static LOGGED_IN_USER = 'LOGGED_IN_USER';
    public static DIET_PREFIX = 'DIET_';
    public static ADMIN_LOGGED_IN = 'ADMIN_LOGGED_IN';
  };

  static Messages = class {
    public static ERROR_MESSAGE = 'Error saving to localStorage';
    public static DIET_SAVED = 'Diet Saved';
    public static DISH_ADDED = 'Dish added!';
    public static DISH_DATA_ERROR = 'Please make sure all data is entered';
    public static WELCOME_ADMIN = 'Welcome Mojo!';
    public static ENTER_VALID_CRED = 'Enter valid credentials';
    public static REGISTERED_SUCCESSFULLY = 'Registered successfully';
    public static CRED_ALREADY_EXISTS = 'Entered user name already exists';
    public static PASSWORD_NO_MATCH = 'Entered passwords does not match';
    public static WELCOME_USER = 'Welcome to MojoDiet';
    public static LOGGED_OUT = 'Logged out successfully, See you later!';
  };

  static AdminCredentials = class {
    public static USER_NAME = 'admin';
    public static PASSWORD = 'MojoNetworks';
  };

  static RoutePath = class {
    public static ADMIN_DASHBOARD = 'adminDashboard';
    public static SELECT_USER = 'dashboard';
    public static ADMIN_LOGIN = 'adminLogin';
    public static USER_LOGIN = 'userLogin';
    public static USER_DASHBOARD = 'userDashboard';
  };
}
