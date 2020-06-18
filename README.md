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

## Exercise 2 - Modifying component output
Open `src/App.tsx` and edit its contents in order to produce the following output:
```html
<div class="container py-5">
    <header class="mb-5">
        <h1 class="d-flex justify-content-between align-items-center">
            <span>React Tutorial App</span>
            <small class="text-muted">v. 03/03/2019</small>
        </h1>
        <hr>
    </header>
    <div class="row justify-content-center">
        TODO
    </div>
</div>
```
While using smart IDEs like IntelliJ we can notice the following requirements of JSX:
- `class` is reserved keyword in Javascript and needs to be replaced with `className` (another example is `for` where `htmlFor` should be used instead)
- JSX is more restrictive than HTML and does not support self-closing tags like `<hr>` - you need to use `<hr />` instead

Next, try to replace 03/03/2019 with the current date. You can obtain it using the following snippet. Expressions in JSX are embedded using `{}` - eg. `{"1 + 1 is " + 2}`
```javascript
new Date().toLocaleDateString()
```

Also, if you want you can now remove `src/logo.svg` and `src/App.css` files along with their imports in `src/App.tsx` - we won't need them anymore.
