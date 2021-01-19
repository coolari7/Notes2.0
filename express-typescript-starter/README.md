# Express Typescript Starter

## Introduction

This README is intended as a guide to set up a starter repo for a NodeJS backend (*without **decorators***) using:

- [expressjs](https://expressjs.com/) as the web application framework
- [typescript](https://www.typescriptlang.org/) for type safety
- [eslint](https://eslint.org/) for linting
- [prettier](https://prettier.io/) for code formatting
- [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for ensure code quality and style consistency 
- [mongoosejs](https://mongoosejs.com/) as ODM for database
- [jestjs](https://jestjs.io/) for unit testing
- [supertest](https://www.npmjs.com/package/supertest) for integration testing
- [bunyan](https://www.npmjs.com/package/bunyan) for logging

<details>
<summary>Remaining:</summary>
<p>

- Error Handling
- Environment Variables
- Package Manager (for automatic restart)
- Deployment (Dockerfile etc.)

</p>
</details>

## Disclaimer

This README is heavily biased per the present knowledge and preferences of the author, and is subjected to changes over time. Users are requested to do their own research.  
The setup is done keeping Windows operating system in mind.  
  
**WARNING:** Halfway through the preparation (*15th December, 2020*), the author realized that *mongoose is **NOT** well suited for typescript.* Newer packages like ***``typegoose``*** might be better. These will be tested in *another starter pack*.

## Table Of Contents

1. [Setting up typescript with express](#1-setting-up-typescript-with-express)
2. [Adding ESLint and Prettier](#2-adding-eslint-and-prettier)
3. [Setting up Git Hooks](#3-setting-up-git-hooks)
4. [Adding MongoDB and Mongoose](#4-adding-mongodb-and-mongoose)
5. [Adding Jest and supertest](#5-adding-jest-and-supertest)
6. [Setting up Logging](#6-setting-up-logging)

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
  "lint": "eslint ./src --ext .ts --fix"
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

**UPDATE January 15th, 2021**  
  
It is also recommended that you add the following script to your ``package.json`` as it will come handy when using ***git hooks***:

```javascript
{
  "prettify": "prettier --write ./src/**/*.ts"
}
```

### 3. SETTING UP GIT HOOKS

As per documentation:

> Git has a way to fire off **custom scripts** when certain important actions occur.

These are hooks. Some examples are **``pre-commit``**, **``pre-push``** and **``post-merge``**. We can tap into these hooks and inject custom scripts. For instance, we could run *``eslint``* and *``prettier``* before commiting code to the repository so the repository code is always clean and readable.  
  
For this, we need to install two packages:

1. [husky](https://www.npmjs.com/package/husky) for tapping into the git hooks
2. [lint-staged](https://www.npmjs.com/package/lint-staged) for running a sequence of command(s) on *staged files*

```javascript
npm i -D husky lint-staged;
```

Technically, you could make do with just **``husky``**. **``Lint-staged``** comes in handy when the project is very large, and linting followed by *"prettifying"* takes a long time. In such case, linting and prettifying *just the staged files* saves a lot of time.  
  
Create the following two files in your root folder:

```javascript
// .huskyrc.js

module.exports = {
  "pre-commit": "lint-staged"
}
```

```javascript
// .lintstagedrc.js

module.exports = {
  "*.ts": [
    "prettier --write", // Prettify the staged files
    "eslint --fix"      // And then lint them
  ]
}
```

Doing this will make sure that the **``lint-staged``** command runs before commit. That command will execute the two commands: ``prettier --write`` and ``eslint --fix``.

> **WARNING:** If the 2nd command fails (because ESLint CAN NOT --fix all the errors), then ***the commit will fail*** thereby preserving the code integrity of your repository.

### 4. ADDING MONGODB AND MONGOOSE

For the purpose of this tutorial, mongodb is chosen as the database, and mongoose as its ODM. This section will be covered in essentially two sub-sections:

1. **Setting up database connectivity**
2. **Working with models**

#### 1. Setting up database connectivity

*Let us start by installing **mongoose**:*

```javascript
npm i mongoose;
```

```javascript
npm i -D @types/mongoose
```

Keeping in mind the *test-ability* of applications, they are typically broken down into ***Services*** as they can be treated and tested in a standalone fashion.

Let us start by creating a ``DatabaseService`` class that will establish a connectivity to the database in one of it's functions:

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

Refer to the commit **[MongoDB Database Service and Connectivity](https://github.com/coolari7/Notes2.0/commit/69aa2cd699ff96f4cc689b1049489979626eef38)** to see the complete setup for database connectivity along with the files.

#### 2. Working with models

We will be working on a simple User model with **firstName**, **lastName**, **birthDate**, **email**, **password** and **username**.

When it comes to working with models, keeping aside the uniqueness of each case, there are fundamentally **two** aspects to be taken into consideration (**three**, if you consider *routing* as an aspect):

* the ***typescript*** aspect
* the ***mongoose*** aspect

**Why?**  
``mongoose`` and ``typescript`` use different types, and to successfully work with both, we end up having to declare user fields in both mongoose ``Schema`` and typescript ``interface``. This results in *multiple sources of truth*, which should be avoided. Unfortunately, there is no way out of this without using a different npm package (``ts-mongoose``, ``typegoose``).  
Since we'll be going ahead with multiple sources of truth, it is important for us to try and keep the sources *in sync*. This<sup>[5](#mongoose)</sup> article shows a way.

<hr>
  
##### *The typescript aspect:*

We keep typescript and mongoose in sync, by essentially working off of a *base interface*. Let us start by creating it with the aforementioned fields:

```javascript
// IUser Base Interface
export interface IUser {
  firstName: String;
  lastName: String;
  birthDate: Date;
  email: String;
  password: String;
  username: String;
}
```

Next, take note of the two typescript definitions for the ``model()`` function (copied from ``@types/mongoose/index.d.ts``), which is ultimately used to compile a Schema into a Model:

```javascript
// Case 1
model<T extends Document>(...args): Model<T>;

// Case 2
model<T extends Document, U extends Model<T>>(...args): U;
```

Two points:  

1. As is evident above, typescript needs at least one generic to be present, and it has to be an interface extending the ``Document`` interface. Without this, intellisense will not happen.
2. If your schema has ***virtuals / methods***, the base interface ``IUser`` will be insufficient and may cause compile-time issues (when you try and access a ***virtual*** or a ***method*** on a ``document``).  

For example, if we add the following three:

* ``virtual: age``
* ``virtual: fullName``
* ``method : sameBirthDateCount()``

It calls for the creation of another interface extending the Document interface:

```javascript
export interface IUserDoc extends IUser, Document {
  /* Virtuals */
  age: Number;
  fullName: String;
  
  /* Methods */
  sameBirthDateCount(): Promise<Number>;
  
  /* If timestamps are set to true */
  createdAt: Date;
  updatedAt: Date;
}
```

Another point:

1. If your schema has ***statics***, then those needed to be added too. But not at the ``document`` level. They'll be added to the ``model``, which means that we'll have to create an interface for a model. And will be going with ``// Case 2`` up above:

```javascript
export interface IUserModel extends Model<IUserDoc> {
  /* Statics */
  newMonthlyUsers(): Promise<Number>;
}
```

With this in place, we can now move to the mongoose aspect.

<hr>

##### *The mongoose aspect:*

There are two important things about the ***``mongoose``*** aspect:

1. the ***``loadClass()``*** function
2. the ***``SchemaDefinition``***

The ***``loadClass()``*** function takes an ``ES6`` class as an argument and maps its:

| ES6 class         | Mongoose equivalent |
| ----------------- | ------------------- |
| getters & setters | virtuals            |
| methods           | methods             |
| statics methods   | statics             |

In order to keep the *multiple sources of truth in sync*, make sure that the class implements from the *base interface* **``IUser``**.

```javascript
export class UserClass implements IUser {
  /**
   * Define all of IUser's properties
   * here. Use the non-null assertion
   * operator to prevent unnecessary
   * constructor initialization.
   */
   
   /* VIRTUALS */
   get age(): number {
     // some code
   }
   
   get fullName: number {
     // some code
   }
   
   /* METHODS */
   public async sameBirthDateCount(): Promise<Number> {
     // some code
   }
   
   /* STATICS */
   public static async newMonthlyUsers(): Promise<Number> {
     // some code
   }
}
```

Use the above class as an argument for ``loadClass()``.

> **PRECAUTION:** The **``loadClass()``** method should be called before model creation (using the **``model()``** function), or else the virtuals, methods and statics won't be loaded.

The way we define the **``SchemaDefinition``** also plays a role in keeping *the multiple sources of truth in sync*. For this purpose, we use typescript's inherent utility type ``Record`` as follows:

```javascript
export const UserSchemaDefinition: Record<
  keyof IUser, 
  SchemaTypeOptions<any>
> = {
  /**
   * Define all of IUser's properties
   * along with their SchemaTypeOptions:
   * {
   *   type: String,
   *   trim: true,
   *   select: false,
   * }
   */
}
```

The ``Record<keyof IUser, T>`` ensures that the object that follows, must have all of its keys amongst ``IUser``'s keys. **This is fundamentally how we ensure consistency between mongoose's ``Schema`` and typescript's ``interface``.** This is  also a hack at best, and it is advisable to move away from mongoose, as it does not work well with typescript.  
  
With these in place, we can now move on to the creation of a new Schema, followed by a Model:

```javascript
// Create the Schema
export const UserSchema = new Schema(
  UserSchemaDefinition, 
  UserSchemaOptions // SchemaOptions seperated out into its own variable
);

// Load virtuals, methods & statics
UserSchema.loadClass(UserClass);

/**
 * Define any Pre & Post Hooks here
 */

// Create the Model
export const User = model<IUserDoc, IUserModel>("User", UserSchema); 
```

Refer to the commit **[MongoDB Working with models](https://github.com/coolari7/Notes2.0/commit/80eda361303b3a3fe35e4e4e58380451db66754b)** to see:

1. the ``source code`` for everything above
2. Routes for the User model

### 5. ADDING JEST AND SUPERTEST

### 6. SETTING UP LOGGING

Logging is essential to every application. Logs help in error monitoring, security purposes and debugging. There are several logging frameworks out there. At the time of writing this section (*January 19th, 2021*), the author has chosen to go ahead with **``bunyan``**.  
  
Let's start by installing bunyan in our application:

```javascript
npm i bunyan;
```

```javascript
npm i -D @types/bunyan;
```

The *Factory Design Pattern*<sup>[7](#factory)</sup> will be used for logging with bunyan, i.e. a ``LoggerFactory`` will be set up, and then ``Logger`` objects will be created from it:

```javascript
/* 
 * /shared/logging/loggerFactory.ts 
 */

class LoggerFactory {
  protected readonly logger: Logger;
  
  constructor() {
    /* 
     * use the createLogger() function to create
     * a logger and assign it to the property
     */
  }
  
  getNamedLogger(source: string): Logger {
    return this.logger.child({ source });
  }
}

export const loggerFactory = new LoggerFactory();
```

## Appendix I: Typescript

### 1. ``index.ts`` module resolution

The index.ts folder structure improves export-ability.

> Typescript module resolution picks up ``index.ts`` file from folder name if it is there and try to import packages.

So try and create and index.ts file with only:

```javascript
// index.ts
export * from "./[sub-folder/...]fileName1";
export * from "./[sub-folder/...]fileName2";
export * from "./[sub-folder/...]fileName3";
```

Make sure that ``fileName1``, ``fileName2`` and ``fileName3`` **DO NOT** have any **``default``** exports!

### 2. ``this`` parameters

When the ``--noImplicitThis`` flag is set, functions which use the ``this`` keyword are mandated to explicitly set the type for ``this``. As per [typescript documentation](https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters):

> To fix this, you can provide an explicit this parameter. this parameters are fake parameters that come first in the parameter list of a function

## Appendix II: Mongoose

### 1. ``virtuals``

When you (inadvertently) convert a ``document`` to a ``POJO`` (JSON object), which can happen when you send a response back to the client with the document as the body, **``virtuals``** are **NOT** included *by default*. To include them, you have to:

```javascript
// SchemaOptions
{
  toJSON: {
    virtuals: true,
  },
}
```

### 2. ``id`` vs ``_id``

As per [documentation](https://mongoosejs.com/docs/guide.html#id), mongoose adds an ``id`` **``virtual`` ``getter``**  to every document by default. This ``id`` essentially casts the ``_id`` property's value to a ``string``, or in the case of an ``ObjectId``, to its *hexString*.  
Personal preference is that ``_id`` is enough, and ``id`` be **disabled**:

```javascript
// SchemaOptions
{
  id: false,
}
```

### 3. ``select: false`` Schema - level

When the collection contains sensitive information such as **passwords**, it doesn't make sense to include them in the results for queries such as ``find`` or ``findOne`` etc. A Schema - level select false can help in such a situation:

```javascript
// SchemaTypeOptions
{
  password: {
    type: String,
    select: false // Makes sure that passwords are excluded
  }
}
```

*In some situations however*, inclusion of ``select: false`` properties might be necessary. For instance, if **passwords** are in fact needed in the query output, then:

1. **EITHER** chain the query functions with a ``select()`` function
2. **OR** provide ``projection: any`` as the *second argument* to the query function:

```javascript
// Case 1
const user = await User.findOne({}).select("+password");

// Case 2
const user = await User.findOne({}, "+password");
```

Notice the **``"+password"``**? As per [mongoose documentation](https://mongoosejs.com/docs/api/query.html#query_Query-select):

> if a path is prefixed with +, it **forces inclusion** of the path, which is useful for paths excluded at the schema level

Also note this, as it is important for projections:

> A projection must be **either inclusive or exclusive**. In other words, you must either list the fields to include (which excludes all others), or list the fields to exclude (which implies all other fields are included). The _id field is the only exception.

### 4. ``Projections`` with ``virtuals``

**Exercise caution** when using projections and virtuals together:

1. As mentioned in **1. ``virtuals``** above, using ``toJSON: { virtuals: true }`` populates virtuals during **``Document.prototype.toJSON()``** method.
2. In **express.js**, methods ``res.send()`` & ``res.json()`` convert object bodies into JSON before sending over HTTP. If the object has a ``toJSON()`` method of its own (which a mongoose ``Document`` does), that function is invoked to perform said conversion.
3. Since **``projection``** happens before populating **``virtuals``**, **caution** is advised.
4. If a certain property (for instance, **``birthDate``**) is **excluded** during projection, but a virtual (for instance, **``age``**) requires that property (**``birthDate``**) to be present, the **``virtual getter``** may throw an **``ERROR``** during ``toJSON()`` (provided ``virtuals: true`` is supplied), which may cause the *controller* to throw an **``ERROR``**.

**Best Practices**:

1. Make sure that the **``virtual getters``** are enclosed in a ``try...catch``, so as to avoid errors.
2. Double check the projections to make sure none of them conflict with any of the virtuals.
3. If you absolutely need to **exclude** certain properties from the response body, but need to **include** virtuals that require those properties, *use ``toJSON(options)``'s **transform** property* as mentioned below.

### 4. ``transform`` in ``toJSON`` / ``toObject``

Using **``transform``**, is another way of modifying the object before sending it over HTTP. For instance, it could be used to hide sensitive information by deleting it from the JSON object.  
As per [mongoose documentation](https://mongoosejs.com/docs/api.html#document_Document-toObject), **``transform``** can be applied on a ``Schema`` level, or ``inline``.

```javascript
// Case 1: Schema Level: SchemaOptions
{
  toJSON: {
    /**
     * @param doc - the mongoose document
     * @param ret - corresponding JSON object
     */
    transform: (doc, ret) => {
      const copy = ret; // ESLint Best Practice
      delete copy.password;
      return copy;
    }
  }
}
```

```javascript
// Case 2: Inline
res.status(200).send(
  user.toJSON({
    transform: (doc, ret) => {
      const copy = ret;
      delete copy.password;
      return copy;
    }
  })
)
```

Use ``// Case 2: Inline`` in conjugation with **"**``Projections`` with ``virtuals`` Best Practices - Pt. 3 **"**, to ***exclude** certain properties from the response body whilst retaining virtuals that require those properties*. Include to-be-excluded properties during projections, and delete them with an inline transform.

## Acknowledgements

<a name="tsconfig">1.</a> [This medium article](https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b) contains exhaustive examples on **tsconfig.json** options.  
<a name="wanago">2.</a> The [typescript-express](https://wanago.io/courses/typescript-express-tutorial/) series on the website [wanago.io](https://wanago.io/) was hugely helpful.  
<a name="robertcooper">3.</a> Robert Cooper's [article](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project) was instrumental in setting up ESLint with Prettier.  
<a name="prettier">4.</a> [This short article](https://prettier.io/docs/en/comparison.html) explains the difference between the operations of Prettier and a traditional linter such as ESLint.  
<a name="mongoose">5.</a> When using mongoose and typescript, the database fields are duplicated between an interface and a schema. [This article](https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc) gives a method to keep them in sync.  
<a>6.</a> The ``loadClass()`` function implements the ``IUser`` interface and initializes it's properties using the [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator).  
<a name="factory">7.</a> To learn more on **Factory Design Pattern**, [click here](https://www.tutorialspoint.com/design_pattern/factory_pattern.htm).  