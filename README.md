# React Workshop

This workshop contains exercises to help you understand how to create and test  applications using React library.

Every exercise has a corresponding branch `exercise-x` (where `x` equals exercise number) with setup code.

In case you get lost you can checkout setup code for the next exercise, which is the solution for the previous one.

## Exercise 1 - Creating application using CLI
In order to create a new project using `create-react-app` CLI invoke the following command, where `my-app` is the name of the directory that will be created and `--template typescript` enables TypeScript support:
```bash
npx create-react-app my-app --template typescript
```
For users with `npm` version < `5.1`:
```bash
npm install -g create-react-app
create-react-app my-app --template typescript
```
To avoid worrying about CSS append the following `link` with Bootstrap 4 CSS to `head` section in `public/index.html` file.
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
```
Development server can be started using
```bash
npm start
```
Other useful commands can be found inside `package.json` file:
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
