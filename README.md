# Basic JWT Auth
Small project implementing JWT authentication with a React front end using Context API for state management

This is only to show a basic use of how to manage user state in React. Any token based system is viable, just make sure to store tokens/refresh tokens in the browsers ``cookies`` and not ``localstorage`` like this project does

### Protected Routes

Private routes that require login such as ``/dashboard`` in this example check that the user has been authenticated before rendering the dashboard component. If a session hasn't be authenticated, they will be redirected to the ``/login`` page

### Storing Tokens

This project stores the JWT token in ``localstorage`` but it is highly recommended to store the tokens in browser ``cookies`` for added security to prevent against ``cross-site scripting`` attacks. 

On top of that, you can use a ``refreshToken`` based system, which ramps up the security of your users significantly 
