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

## Exercise 5 - Working with arrays
Another improvement would be to use `array` to dynamically render tiles. Here's how to do it in JSX using [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map):
```jsx
<div>
    {['a', 'b', 'c'].map((element, index) => (
        <span>I am {element} at index {index}</span>
    ))}
</div>
```
Here's prefilled array of tiles:
```typescript
const board = [
    TileType.CIRCLE, TileType.CROSS,  TileType.CIRCLE,
    TileType.CROSS,  TileType.CIRCLE, TileType.CROSS,
    TileType.CIRCLE, TileType.EMPTY,  TileType.EMPTY
];
```

## Exercise 6 - Stateful components
Until React 16.8 holding state in components was acomplished by using Javascript classes which extended `React.Component`. Below is a minimal example of using `state` and handlers - counter with button for incrementing value:
```tsx
interface State {
    counter: number;
}

class StatefulComponentExample extends React.Component<any, State> {
    state = {
        counter: 0
    };

    handleClick = () => this.setState(prevState => ({
        counter: prevState.counter + 1
    }));

    render() {
        return (
            <div>
                Current value: {this.state.counter} <br />
                <button onClick={this.handleClick}>Increment</button>
            </div>
        );
    }
}
```
First of all, if we wanted to use state, our component needed to be a class. In class components we can access `props` and `state` using `this.props` and `this.state`. Adding handler to button is very similar to old HTML syntax, except that we are passing function reference as an argument and the name of the attribute is `onClick`, not `onclick`. State mutations in class components are handled via [this.setState](https://reactjs.org/docs/react-component.html#setstate) method.

In our application, we need to create stateful component for storing board state. Let's start with the following code in `src/GameContainer.tsx`:
```tsx
interface GameState {
    board: TileType[];
}

class GameContainer extends React.Component<any, GameState> {
	render() {
		return (
			<Game board={this.state.board} />
		);
	}
}
```
In case you are wondering why `GameContainer` - Dan Abramov, one of the React core contributors, once introduced the idea of splitting code between so-called [Dumb and Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

Then, we need to initialize our state with value, as in previous example. Let's move there `board` from `src/Game.tsx`. Additionally, we need to change `Game` so that it uses `board` passed via `props`.

Next, let's add some `onClick` handler which will set clicked `Tile` state to X:
```tsx
handleSelect = (index: number) => {
    this.setState(state => {
    	const board = [...state.board];
    	board[index] = TileType.CROSS;
        return {
            board
        };
    });
};
```
Then, we need to pass it down to `Game` and even further to `Tile` - but how to pass `index` value? Using anonymous inline functions:
```tsx
<Tile onClick={() => onSelect(index)} />
```
Finally, we need to decide whether it's X or O's turn. Simple solution would be to extend our state with boolean flag: `circleIsNext`, which we would flip inside `select`. However, that would violate so-called `single source of truth` principle which means that we could end up havign conflicted data.

A more robust solution would be to count the number of empty tiles in our board - if it's even it could mean that it's O's turn.

As I mentioned earlier, until React 16.8 class components were the only way to handle state natively in React components. This version introduced a groundbreaking change - React hooks. 

With hooks, you can achieve almost everything that class components allowed, using simpler syntax and better code locality.

Here is an example of the same counter as before:
```tsx
const StatefulComponentExampleWithHooks: React.FunctionComponent  = () => {
    const [counter, setCounter] = React.useState(0);

    return (
        <div>
            Current value: {counter} <br />
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
        </div>
    );
}
```

As an additional exercise you can try and implement `GameContainer` using hooks.

## Exercise 7 - Logical operators
It is not possible to use traditional `if` statement inside JSX tree because it does not return value. However, we can use this operator cheatsheet instead:
```jsx
// conditional rendering
<div>
	{flag && (
	    <Component />
	)}
</div>

// if-elseif rendering
<div>
	{flag && (
	    <ComponentIfTrue />
	) || anotherFlag && (
	    <ComponentIfFalse />
	)}
</div>

// this also works
<div>
	{flag ? (
	    <ComponentIfTrue />
	) : (
	    <ComponentIfFalse />
	)}
</div>
```
In our application we want to display information about the winner. But first we need to calculate if we have one. We will do it using the following function which we will add in `src/utils.ts`:
```typescript
export function calculateWinner(board: TileType[]): TileType | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}
```
With this information, we can pass it to the `Game` component and display the following alert, which of course should be wrapped with condition and parametrized:
```html
<div class="alert alert-success text-center">
    The winner is: <strong>Player O</strong>!
</div>
```
Additionaly, we can show draw message if there is no winner and there are 0 empty tiles:
```html
<div class="alert alert-warning text-center">
    It's a draw!
</div>
```

## Exercise 8 - React Router
We want to add some routing to our application. First, we need to install router and its typings:
```bash
npm install react-router-dom --save
npm install @types/react-router-dom --save-dev
```
Now we can replace our `<GameContainer />` inside `src/App.tsx` with router's `Switch` component:
```tsx
<Switch>
    <Route path="/game" component={GameContainer}/>
    <Route path="/weather/:city?" component={WeatherContainer}/>
    <Route component={Home}/>
</Switch>
```
For better code organisation, let's move all game-related files into `Game` directory and create `Weather` and `Home` for the rest of the routes. Then we can create some empty components in those directories in order to compile our code.

This is the code for `src/Home/index.tsx`, which will be our home route. It will display cards with links to other routes:
```tsx
import React from 'react';
import Card from "./Card";

const Home: React.FunctionComponent = () => (
    <React.Fragment>
        <Card
            title="Tic-tac-toe"
            button="Play a game"
            url="/game"
        />
        <Card
            title="Open Weather API"
            button="Get forecast"
            url="/weather"
        />
    </React.Fragment>
);

export default Home;
```
You may notice new type of component here - `React.Fragment`. Because JSX is a tree-like structure, you may only have one root node. In our example we want to have 2 cards so in order to do it we need to wrap them with some other component. `React.Fragment` does not render any HTML so it's basically a wrapper for returning multiple nodes.

Next we need to implement `src/Home/Card.tsx` to return the following parametrized code:
```html
<div class="col-3">
    <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">Tic-tac-toe</h5>
            <a class="btn btn-primary" href="/game">Play a game</a>
        </div>
    </div>
</div>
```
Links in `react-router` can be created using `Link` component.
