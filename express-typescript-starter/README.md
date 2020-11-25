# Express Typescript Starter

## Introduction

This README is intended as a guide to set up a starter repo for a NodeJS backend using:

* [expressjs](https://expressjs.com/) as the web application framework
* [typescript](https://www.typescriptlang.org/) for type safety
* [eslint](https://eslint.org/) for linting (***OPT***)
* [prettier](https://prettier.io/) for code formatting (***OPT***)
* [jestjs](https://jestjs.io/) for unit testing
* [supertest](https://www.npmjs.com/package/supertest) for integration testing and
* [mongoosejs](https://mongoosejs.com/) as ORM for database

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
> Creating a *New Folder*, navigating into it & running ``npm init``

The first step, as evidenced by the title is to setup typescript with express in our project.  
The goal is to have a ``GET /`` route as a *health check*.  
Let's install and setup typescript first:

```javascript
npm i --D typescript;
```

Now we need a ``tsconfig.json`` file which contains compilations instructions for typescript. Create one by running:

```javascript
npx tsc --init;
```

<details>
<summary><b>The usual options are:</b></summary>
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
    "rootDir": "./src",

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

## Acknowledgement

1. The **typescript-express** series on the website [wanago.io](https://wanago.io/) was hugely helpful.
