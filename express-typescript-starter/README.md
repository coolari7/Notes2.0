# Express Typescript Starter

## Introduction

This README is intended as a guide to set up a starter repo for a NodeJS backend (*without **decorators***) using:

- [expressjs](https://expressjs.com/) as the web application framework
- [typescript](https://www.typescriptlang.org/) for type safety
- [eslint](https://eslint.org/) for linting (**_OPT_**)
- [prettier](https://prettier.io/) for code formatting (**_OPT_**)
- [mongoosejs](https://mongoosejs.com/) as ODM for database
- [jestjs](https://jestjs.io/) for unit testing
- [supertest](https://www.npmjs.com/package/supertest) for integration testing and

<details>
<summary>Remaining:</summary>
<p>

- Logging
- Error Handling
- Git Hooks
- Environment Variables
- Package Manager (for automatic restart)
- Deployment (Dockerfile etc.)

</p>
</details>

## Disclaimer

This README is heavily biased per the present knowledge and preferences of the author, and is subjected to changes over time. Users are requested to do their own research.  
The setup is done keeping Windows operating system in mind.

## Table Of Contents

1. [Setting up typescript with express](#1.+SETTING+UP+TYPESCRIPT+WITH+EXPRESS)
2. [Adding ESLint and Prettier](#2.+ADDING+ESLINT+AND+PRETTIER)
3. [Adding MongoDB and Mongoose](#3.+ADDING+MONGODB+AND+MONGOOSE)
4. Adding Jest and supertest to it

### 1. SETTING UP TYPESCRIPT WITH EXPRESS

> **PRE-REQUISITE**  
> Creating a _New Folder_, navigating into it & running `npm init`

The first step, as evidenced by the title is to setup typescript with express in our project.  
The goal is to have a `GET /` route as a _health check_.  
_Let us install and setup **typescript** first:_

```javascript
npm i --D typescript;
```

Now we need a `tsconfig.json` file which contains compilations instructions for typescript. Create one by running:

```javascript
npx tsc --init;
```

<details>
<summary>The usual <b>tsconfig</b> options are expanded below.</summary>
<p>

```javascript
// tsconfig.json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "ES2017",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src", /* Create a src folder */

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,

    /* Advanced Options */
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

</p>
</details>

For more, refer to the acknowledgements<sup>[1](#tsconfig)</sup>

Following this, we need to add a couple of scripts to `package.json` in order to actually compile the typescript code written in `./src`, to javascript code & output it to `./dist`:

```javascript
// package.json
{
  "scripts": {
    /*
     * Running this will compile typescript to javascript
     * Suitable in production
     */
    "build-ts": "tsc",
    /*
     * Running this will watch file changes in .ts file, and
     * automatically compile them. Suitable in development
     */
    "watch-ts": "tsc -w"
  }
}
```

_Let us now install and setup an **express** server:_

```javascript
npm i express;
```

```javascript
npm i -D @types/express;
```

After this, set up a basic express server as illustrated in the commit [**Express Server Setup**](https://github.com/coolari7/Notes2.0/commit/f6779d6ffd113655c97bf4adc2b7f883282fda5f) or refer to the acknowledgements<sup>[2](#wanago)</sup>. It essentially involves the creation of 4 files:

- [app.ts](https://github.com/coolari7/Notes2.0/blob/f6779d6ffd113655c97bf4adc2b7f883282fda5f/express-typescript-starter/src/app.ts) - Containing the blueprint of an express App
- [server.ts](https://github.com/coolari7/Notes2.0/blob/f6779d6ffd113655c97bf4adc2b7f883282fda5f/express-typescript-starter/src/server.ts) - Creating an object of the class App, and listening
- [controller.interface.ts](https://github.com/coolari7/Notes2.0/blob/f6779d6ffd113655c97bf4adc2b7f883282fda5f/express-typescript-starter/src/controllers/controller.interface.ts) - Implementing a generic controller interface
- [health-check.controller.ts](https://github.com/coolari7/Notes2.0/blob/f6779d6ffd113655c97bf4adc2b7f883282fda5f/express-typescript-starter/src/controllers/health-check/health-check.controller.ts) - Implementing the controller interface to create a health-check route

Following this, we need to a way to run the express server whilst watching it for file changes. This would ease the process of development. The following _popular_ package comes in handy:

```javascript
npm i -D ts-node-dev;
```

Add a script to the `package.json` file:

```javascript
{
  /*
   * Running "npm run dev" will watch the script
   * for changes, compile it, and run it.
   */
  "dev": "ts-node-dev ./src/server.ts"
}
```

The above script eliminates the need for <s>`{ "watch-ts": "tsc -w" }`</s> written earlier so kindly remove it.

### 2. ADDING ESLINT AND PRETTIER

Linting analyses source code for errors. To get started, *let us install **eslint** first*:

```javascript
npm i -D eslint;
```

Following this installation, we need to create a ``.eslintrc.*`` configuration file. Fortunately, the ``eslint`` module we installed above comes with a CLI and an ``--init`` command:

```javascript
npx eslint --init;
```

<details>
<summary>This will prompt a whole host of questions whose answers (**based on author's preferences**) are:</summary>
<p>

> **How would you like to use ESLINT?**  
> To check syntax, find problems, and enforce code style  
> **What types of modules does your project use?**  
> JavaScript modules (import/export)  
> **Which framework does your project use?**  
> None of these  
> **Does your project use TypeScript?**  
> Yes  
> **Where does your code run?**  
> Node  
> **How would you like to define a style for your project?**  
> Use a popular style guide  
> **Which style guide do you want to follow?**  
> Airbnb  
> **What format do you want your config file to be in?**  
> JavaScript  

</p>
</details>

You should now have a ``.eslintrc.js`` file in your root directory, with a few configurations. Let us now add a script to ``package.json``:

```javascript
{
  /*
   * The --ext flag stands for extensions. This
   * command lints the ./src folder.
   * --fix essentially modifies the code as per 
   * ESLint rules
   */
  "lint": "eslint \"./src/**\" --fix"
}
```

Refer to acknowledgements<sup>[4](#prettier)</sup> for understanding the need of Prettier. *Let us now add **prettier** to the project:*

```javascript
npm i -D prettier eslint-config-prettier eslint-plugin-prettier;
```

* [prettier](https://prettier.io) - core library. It is to be included in the plugins array, at the end so it can override other configs
* [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - An eslint-config that disabled ESLint formatting rules that conflict with Prettier. Works best if used in combination of another config ([airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) in this case)
* [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) - An eslint-plugin that registers prettier as a plugin that essentially runs prettier as an ESLint rule, outputting formatting errors

We need to make the following modification to the ``.eslintrc.js`` file:

```javascript
/*
 * Add "plugin:prettier/recommended" to the "extends" config array
 * at the end. This one command:
 * 1. extends enables eslint-config-prettier to disable ESLint
 * formatting rules
 * 2. registers Prettier as a plugin &
 * 3. runs Prettier formatting rules as ESLint errors.
 */
{
  extends: ["airbnb-base", "plugin:prettier/recommended"]
}
```

With this, prettier and eslint are all setup. Run ``npm run lint`` to check for **``errors``** and **``warnings``**, and adjust your ESLint rules in the rules property inside the ``.eslintrc.js`` file accordingly. Refer to the commit **[ESLint and Prettier Setup](https://github.com/coolari7/Notes2.0/commit/fa544d69ca0cf01fad00a7a47e19f7383e60c84b)** for details on ``package.json`` and ``.eslintrc.js``.

### 3. ADDING MONGODB AND MONGOOSE

For the purpose of this tutorial, mongodb is chosen as the database, and mongoose as its ODM. *Let us start by installing **mongoose**:*

```javascript
npm i mongoose;
```

```javascript
npm i -D @types/mongoose
```

Keeping in mind the *test-ability* of applications, they are typically broken down into ***Services*** as they can be treated and tested in a standalone fashion.

Let us start with creating a ``DatabaseService`` class that will establish a connectivity to the database in one of it's functions:

```javascript
// database.service.ts
export default class DatabaseService {

  // Accessor Properties
  private dbOptions: ConnectionOptions;
  private dbConnection: Connection;
  
  // Constructor
  constructor() { }
  
  // Function that establishes a connection
  // to a database
  async connectToDatabase() {}
}
```

Now, in our ``app.js``, the database connectivity can be established:

> **Case 1: Strictly before the server's connectivity**  
When all the routes of your application involve database connectivity, then it doesn't make sense for the server to start listening asynchronously, and establish connectivity before the database does.   
**Case 2: Alongside the server's connectivity**  
On the other hand, if there are some routes that serve other purposes and do not require a database connection to be present, then the server and database connectivity could be brought up asynchronously.  
We go with **Case 1**, in this tutorial.

Initialize the *DatabaseService* in ``app.js``:

```javascript
export default class App {
  // Accessor Properties
  private databaseService: DatabaseService;
  
  // Constructor
  constructor() {
    this.databaseService = new DatabaseService();
  }
}
```

Modify the ``listen()`` function to *connect to the database* **before** *listening on a PORT*:

```javascript
export default class App {
  public listen() {
    this.databaseService
      .connectToDatabase()
      .then(() => {
        this.app.listen(this.PORT, () => {
          console.log(`App is listening on PORT ${this.PORT}`);
        });
      })
      .catch((err: Error) => {
        console.log("Failed to establish connection to the database;");
        console.log(err.message);
      });
  }
}
```

## Acknowledgements

<a name="tsconfig">1.</a> [This medium article](https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b) contains exhaustive examples on **tsconfig.json** options.  
<a name="wanago">2.</a> The [typescript-express](https://wanago.io/courses/typescript-express-tutorial/) series on the website [wanago.io](https://wanago.io/) was hugely helpful.  
<a name="robertcooper">3.</a> Robert Cooper's [article](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project) was instrumental in setting up ESLint with Prettier.  
<a name="prettier">4.</a> [This short article](https://prettier.io/docs/en/comparison.html) explains the difference between the operations of Prettier and a traditional linter such as ESLint.  
<a name="mongoose">5.</a>When using mongoose and typescript, the database fields are duplicated between an interface and a schema. [This article](https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc) gives a method to keep them in sync.