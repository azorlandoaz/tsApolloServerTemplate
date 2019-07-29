# MetaDocKit micro-service v.1.0.0

A MetaDocKit micro-service built mainly with TypeScript, Node and Mongo.


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/) (optionally).

# Getting started
- Install dependencies
```
cd <project_name>
npm install
```
- Create `.env` file with all the environment variables needed and place the file in the root folder. See the `.env.example` for all the environment variables expected.
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm run start-dev
```
Its done! If you enable graphql playground from the environment variables you can test it navigating to `http://localhost:<PORT>/<APOLLO_PLAYGROUND_ENDPOINT>` and you should see the playground being served!

# Deploying the app
Just as there is a script for start the server reading a `.env` file, there is a script for start the server that reads the environment variables from the OS:
```
npm run build
npm run start
```
But be sure that all the environment variables declared in `.env.example` are setted in the OS.

## Project Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in the `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/server.ts**        | The server entry point. Configures the listen().                                              |
| **src/app.ts**           | The express configuration file. Where the middlewares are merged and others configurations are executed.   |
| **src/config**           | Apollo server middleware, MongoDB connection and .env file loading comes here, as well as other complex config. |
| **src/common/constants** | Environment variables as language constants are here                                          |
| **src/common/util**      | Reusable code are here as functions or classes.                                               |
| **src/models/gql**       | GraphQL types, schema and resolvers are here.                                                 |
| **src/models/mongo**     | Mongoose models are here.                                                                     |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files)          |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .copyNonTsFiles.ts       | Build script that copies .gql files to the dist folder.                                       |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tslint.json              | Config settings for TSLint code style checking                                                |

## Known errors

To see a full list of known errors thrown by this microservice [check this document](errors.md).

## Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`.                                |
| `build`                   | Full build. Runs ALL build tasks (`tslint`, `copy-non-ts-files`, `tsc`).                          |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch-node`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task         |
| `watch`                   | If you are touching several code and needs automatic compiling use this. Runs all watch tasks (`watch-ts`, `watch-node`) leading by `copy-non-ts-files` task. |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder leading by `copy-non-ts-files` task. |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed               |
| `tslint`                  | Runs TSLint on project files                                                                      |
| `copy-non-ts-files`       | Calls script that copies .gql files to dist directory                                             |
| `start-dev`               | Same as `npm start` but it start the server for read the `.env` file to take the environment variables from there. Useful in development process to avoid the environment variables being setted at SO level. |
| `watch-dev`             | Same as `npm run watch` but it start the server for read the `.env` file to take the environment variables from there. Useful in development process to avoid the environment variables being setted at SO level. |
| `seed` | Inserts data to MongoDB. See `seeds/README.md` for more info. |

## Type Definition (`.d.ts`) Files
TypeScript uses `.d.ts` files to provide types for JavaScript libraries that were not written in TypeScript.
This is great because once you have a `.d.ts` file, TypeScript can type check that library and provide you better help in your editor.
The TypeScript community actively shares all of the most up-to-date `.d.ts` files for popular libraries on a GitHub repository called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types).
Making sure that your `.d.ts` files are setup correctly is super important because once they're in place, you get an incredible amount of high quality type checking (and thus bug catching, IntelliSense, and other editor tools) for free.

> **Note!** Because we're using `"noImplicitAny": true`, we are required to have a `.d.ts` file for **every** library we use. While you could set `noImplicitAny` to `false` to silence errors about missing `.d.ts` files, it is a best practice to have a `.d.ts` file for every library. (Even if the `.d.ts` file is [basically empty!](#writing-a-dts-file)) 

### Installing `.d.ts` files from DefinitelyTyped
For the most part, you'll find `.d.ts` files for the libraries you are using on DefinitelyTyped.
These `.d.ts` files can be easily installed into your project by using the npm scope `@types`.
For example, if we want the `.d.ts` file for jQuery, we can do so with `npm install --save-dev @types/jquery`.

> **Note!** Be sure to add `--save-dev` (or `-D`) to your `npm install`. `.d.ts` files are project dependencies, but only used at compile time and thus should be dev dependencies.

In this template, all the `.d.ts` files have already been added to `devDependencies` in `package.json`, so you will get everything you need after running your first `npm install`.
Once `.d.ts` files have been installed using npm, you should see them in your `node_modules/@types` folder. 
The compiler will always look in this folder for `.d.ts` files when resolving JavaScript libraries.

### What if a library isn't on DefinitelyTyped?
If you try to install a `.d.ts` file from `@types` and it isn't found, or you check DefinitelyTyped and cannot find a specific library, you will want to create your own `.d.ts file`.
In the `src` folder of this project, you'll find the `types` folder which holds the `.d.ts` files that aren't on DefinitelyTyped (or weren't as of the time of this writing).

#### Setting up TypeScript to look for `.d.ts` files in another folder
The compiler knows to look in `node_modules/@types` by default, but to help the compiler find our own `.d.ts` files we have to configure path mapping in our `tsconfig.json`.
Path mapping can get pretty confusing, but the basic idea is that the TypeScript compiler will look in specific places, in a specific order when resolving modules, and we have the ability to tell the compiler exactly how to do it.
In the `tsconfig.json` for this project you'll see the following:
```json
"baseUrl": ".",
"paths": {
    "*": [
        "node_modules/*",
        "src/types/*"
    ]
}
```
This tells the TypeScript compiler that in addition to looking in `node_modules/@types` for every import (`*`) also look in our own `.d.ts` file location `<baseUrl>` + `src/types/*`.
So when we write something like: 
```ts
import * as flash from "express-flash";
```
First the compiler will look for a `d.ts` file in `node_modules/@types` and then when it doesn't find one look in `src/types` and find our file `express-flash.d.ts`.

#### Using `dts-gen`
Unless you are familiar with `.d.ts` files, I strongly recommend trying to use the tool [dts-gen](https://github.com/Microsoft/dts-gen) first.
The [README](https://github.com/Microsoft/dts-gen#dts-gen-a-typescript-definition-file-generator) does a great job explaining how to use the tool, and for most cases, you'll get an excellent scaffold of a `.d.ts` file to start with.
In this project, `bcrypt-nodejs.d.ts`, `fbgraph.d.ts`, and `lusca.d.ts` were all generated using `dts-gen`. 

#### Writing a `.d.ts` file
If generating a `.d.ts` using `dts-gen` isn't working, [you should tell me about it first](https://www.surveymonkey.com/r/LN2CV82), but then you can create your own `.d.ts` file.

If you just want to silence the compiler for the time being, create a file called `<some-library>.d.ts` in your `types` folder and then add this line of code:
```ts
declare module "<some-library>";
```

If you want to invest some time into making a great `.d.ts` file that will give you great type checking and IntelliSense, the TypeScript website has great [docs on authoring `.d.ts` files](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). 

### Summary of `.d.ts` management
In general if you stick to the following steps you should have minimal `.d.ts` issues;
1. After installing any npm package as a dependency or dev dependency, immediately try to install the `.d.ts` file via `@types`.
2. If the library has a `.d.ts` file on DefinitelyTyped, the install will succeed and you are done.
If the install fails because the package doesn't exist, continue to step 3.
3. Make sure you project is [configured for supplying your own `d.ts` files](#setting-up-typescript-to-look-for-dts-files-in-another-folder)
4. Try to [generate a `.d.ts` file with dts-gen](#using-dts-gen). 
If it succeeds, you are done.
If not, continue to step 5.
5. Create a file called `<some-library>.d.ts` in your `types` folder.
6. Add the following code:
```ts
declare module "<some-library>";
```
7. At this point everything should compile with no errors and you can either improve the types in the `.d.ts` file by following this [guide on authoring `.d.ts` files](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) or continue with no types.
8. If you are still having issues, let me know by sending me an email or pinging me on twitter, I will help you.


### Using the debugger in VS Code
Debugging is one of the places where VS Code really shines over other editors.

When you hit `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.
In this file, you can tell VS Code exactly what you want to do:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug <project_name>",
  "program": "${workspaceRoot}/<project_name>/node_modules/ts-node/dist/bin.js",
  "env": {
    "READ_ENV_FILE": "true"
  },
  "args": ["./src/server.ts", "--project", "./tsconfig.json"],
  "cwd": "${workspaceRoot}/<project_name>",
  "protocol": "inspector",
  "preLaunchTask": "Build <project_name>"
}
```
Once the configuration  is setted with the code above we can debug TypeScript in the desired project. Just hit `F5` again and it's done.
Notice that there is a `preLaunchTask` key dedicated to execute the build process before start the debug, in this way the debugger is based in the latest changes.

## TSLint
TSLint is a code linter which mainly helps catch minor code quality and style issues.
TSLint is very similar to ESLint or JSLint but is built with TypeScript in mind.

### TSLint rules
Like most linters, TSLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `tslint.json`.
In this project, we are using a fairly basic set of rules with no additional custom rules.
The settings are largely based off the TSLint settings that we use to develop TypeScript itself.

### Running TSLint
Like the rest of our build steps, we use npm scripts to invoke TSLint.
To run TSLint you can call the main build script or just the TSLint task.
```
npm run build   // runs full build including TSLint
npm run tslint  // runs only TSLint
```
Notice that TSLint is not a part of the main watch task.
It can be annoying for TSLint to clutter the output window while in the middle of writing a function, so I elected to only run it only during the full build.
If you are interesting in seeing TSLint feedback as soon as possible, I strongly recommend the [TSLint extension in VS Code]().

### VSCode Extensions

To enhance your development experience while working in VSCode we also provide you a list of the suggested extensions for working with this project:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
