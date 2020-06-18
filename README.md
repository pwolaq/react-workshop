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

## Exercise 3 - Creating components
Let's start by moving `<header className="mb-5">` along with its children to separate file `src/Header.tsx`:
```typescript
import React from 'react';

const Header: React.FunctionComponent = () => (
    <header className="mb-5">
        <h1 className="d-flex justify-content-between align-items-center">
            <span>React Tutorial App</span>
            <small className="text-muted">v. { new Date().toLocaleDateString() }</small>
        </h1>
        <hr />
    </header>
);

export default Header;
```
First, we need to import React from `react` package installed via `npm`. Then, we define `Header` variable of type `React.FunctionComponent` which is basically arrow function with no arguments that returns JSX. Finally, we export `Header` component from the file so that it can be imported elsewhere.

[Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (aka lambdas) in Javascript:
```javascript
// Traditional, anonymous function
const fn1 = function(name) {
    console.log(`Hello ${name}!`);
}

// Arrow function
const fn2 = (name) => {
    console.log(`Hello ${name}!`);
}

// Arrow function with single argument and single expression (both pairs of brackets can be skipped)
const fn3 = name => console.log(`Hello ${name}!`);
```

Going back to `src/App.tsx` we can now replace `<header className="mb-5">...</header>` with `<Header />`, as long as we import it beforehand using `import Header from './Header.tsx'`. 

Now, create a new `Game` component inside `src/Game.tsx` with following output and replace `TODO` inside `App` component with `<Game />`
```jsx
<div>
    <div className="card">
        <div className="d-flex">
            <div className="p-5">
                <div className="board">
                    <button type="button" className="tile btn btn-success">O</button>
                    <button type="button" className="tile btn btn-info">X</button>
                    <button type="button" className="tile btn btn-success">O</button>
                    <button type="button" className="tile btn btn-info">X</button>
                    <button type="button" className="tile btn btn-success">O</button>
                    <button type="button" className="tile btn btn-info">X</button>
                    <button type="button" className="tile btn btn-success">O</button>
                    <button type="button" className="tile btn btn-outline-secondary" />
                    <button type="button" className="tile btn btn-outline-secondary" />
                </div>
            </div>
        </div>
    </div>
</div>
```
Contents of `index.css` should be replaced with the following CSS in order to apply missing styles:
```css
.tile {
    width: 100px;
    height: 100px;
    font-size: 2rem;
    margin: 5px;
}

.board {
    width: 330px;
    margin: -5px;
}
```

## Exercise 4 - Passing data through props
Let's avoid code duplication in `Game` component by creating reusable `Tile` component:
```typescript
import React from 'react';

export enum TileType {
    EMPTY,
    CIRCLE,
    CROSS
}

interface TileProps {
    type: TileType;
}

const TEXT = {
    [TileType.EMPTY]: '',
    [TileType.CIRCLE]: 'O',
    [TileType.CROSS]: 'X',
};

const COLOR = {
    [TileType.EMPTY]: 'outline-secondary',
    [TileType.CIRCLE]: 'success',
    [TileType.CROSS]: 'info',
};

const Tile: React.FunctionComponent<TileProps> = (props) => (
    <button
        type="button"
        className={`tile btn btn-${COLOR[props.type]}`}
    >
        {TEXT[props.type]}
    </button>
);

export default Tile;
```
Notice that we replaced `React.FunctionComponent` with parametrized `React.FunctionComponent<TileProps>` - that's because our component will receive data through so-called `props` which we parametrized using TypeScript. 

A common practice is to use [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) and replace `props` with `{ type }` so that we can use `type` instead of `props.type` later in the code. Here are few examples of `object destructuring`:
```javascript
const user = { name: "John", surname: "Doe", address: { city: "New York", zipCode: "10055" } };
const { name, surname, address } = user; // name = "John", surname = "Doe", address = { city: "New York", zipCode: "10055" }
const { address: { city, zipCode } } = user; // city = "New York", zipCode = "10055"
const { name: nameAlias } = user; // nameAlias = "John"
```
Another useful feature that we used is `string interpolation`:
```javascript
const name = "Pawel";
console.log(`Hello ${name}!`) // Hello Pawel!
```
