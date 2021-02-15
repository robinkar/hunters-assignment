# Home assignment

Original assignment README.md moved to ASSIGNMENT.md.

I have implemented two hero roles: REGULAR and TREASURER. TREASURER has access to the vault.treasures object and Lisa (id 2) has been seeded as TREASURER, the rest of the heroes have the REGULAR role.  
An simple example of the JWT token fetch for heroes, with the token then being used to get the treasures with GQL is available in example.ts in the root of the project. The example can be run by executing the command `yarn example` while the backend server is running. The result should be that hero 1 fails to fetch the treasure and hero 2 succeeds.  
dotenv has been added as dependency to keep the JWT_SIGNING_SECRET in a .env file.  
Example .env file:
`JWT_SIGNING_SECRET=example_secret`

## Scripts

Use yarn instead of npm, there is some bug with npm and Docz.

Install dependencies: `yarn`

Develop frontend app: `yarn start:front` localhost:8080

Develop backend app: `yarn start:back` localhost:4000

Run treasure fetch example: `yarn example`