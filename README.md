# Password manager:

Create a simple personal password manager tool.
You can choose between Task 1 and Task 2, or you can implement both if you like.
Please upload your project code to your Github public repository and share us the repo link before the interview.

## Task 1:
### Frontend Application
Techstack:
- TypeScript
- Angular

### Features:
1. Add the users encrypted password to the list of users password store.
2. Get the list of all passwords for the user and display it.
3. Get a single item from the password store.
4. Update a password store item. Password should be editable only in decyrpted mode. (Decrypt the password before editing)
5. Delete a password store item.

### Note:
1. Passwords are stored in the below example format:
 [{ id:1, category:'work', app:'outlook', userName:'testuser@mytest.com', encryptedPassword:'TXlQYXNzd29yZEAxMjM=' },
  { id:2, category:'school', app:'messenger', userName:'testuser@mytest.com', encryptedPassword:'TmV3UGFzc3dvcmRAMTIz' }]
2. Passwords are encrypted using Base64 Encoding. (ASCII <=> Base64 )
3. Sample API can be setup using https://www.npmjs.com/package/json-server. Although, you are free to use any library.

## Task 2:
-------
Backend API
Techstack:
- C#
- .Net

### Features:
1. Add the users encrypted password to the list of users password store.
2. Get the list of all passwords for the user.
3. Get a single item from the password store. 
3. Get a single item from the password store with password decyrpted.
4. Update a password store item.
5. Delete a password store item.

### Note:
1. Passwords are stored in the below example format:
 [{ id:1, category:'work', app:'outlook', userName:'testuser@mytest.com', encryptedPassword:'TXlQYXNzd29yZEAxMjM=' },
  { id:2, category:'school', app:'messenger', userName:'testuser@mytest.com', encryptedPassword:'TmV3UGFzc3dvcmRAMTIz' }]
2. Passwords are encrypted using Base64 Encoding. (ASCII <=> Base64 )
3. Setup in-memory DB using https://www.nuget.org/packages/System.Runtime.Caching/. Although, you are free to use any library.

