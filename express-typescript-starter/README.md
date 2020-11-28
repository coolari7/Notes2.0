# Express Typescript Starter

## Introduction

This README is intended as a guide to set up a starter repo for a NodeJS backend using:

- [expressjs](https://expressjs.com/) as the web application framework
- [typescript](https://www.typescriptlang.org/) for type safety
- [eslint](https://eslint.org/) for linting (**_OPT_**)
- [prettier](https://prettier.io/) for code formatting (**_OPT_**)
- [jestjs](https://jestjs.io/) for unit testing
- [supertest](https://www.npmjs.com/package/supertest) for integration testing and
- [mongoosejs](https://mongoosejs.com/) as ODM for database

<details>
<summary>Remaining:</summary>
<p>

- Logging
- Environment Variables
- Deployment (Dockerfile etc.)

</p>
</details>

## Disclaimer

This README is heavily biased per the present knowledge and preferences of the author, and is subjected to changes over time. Users are requested to do their own research.  
The setup is done keeping Windows operating system in mind.

## Table Of Contents

1. Setting up typescript with express
2. Adding ESLint to it
3. Adding Prettier to it
4. Adding Jest and supertest to it
5. Adding mongoose to it

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
<summary>The usual <b>tsconfig</b> options are expanded below. For more, refer to the acknowledgements<sup>[1](#tsconfig)</sup></summary>
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

## Acknowledgements

<a name="tsconfig">1.</a> [This medium article](https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b) contains exhaustive examples on **tsconfig.json** options.  
<a name="wanago">2.</a> The [typescript-express](https://wanago.io/courses/typescript-express-tutorial/) series on the website [wanago.io](https://wanago.io/) was hugely helpful.
