## State: A Component's Memory

- Components often need to change what’s on the screen as a result of an interaction. Components need to “remember” things. Like, the current input value, the current image, the shopping cart.

- In React, this kind of component-specific memory is called state.

But two things prevent that change from being visible using Normal variable:

1.  Local variables don’t persist between renders. When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.

2.  Changes to local variables won’t trigger renders. React doesn’t realize it needs to render the component again with the new data.

To update a component with new data, two things need to happen:

1. Retain the data between renders.
2. Trigger React to render the component with new data (re-rendering).

The useState Hook provides those two things:

1. A state variable to retain the data between renders.
2. A state setter function to update the variable and trigger React to render the component again.

## Adding a state variable

To add a state variable, import useState from React at the top of the file:

```JavaScript
import { useState } from 'react';
```

Then, replace this line:👇

```JavaScript
let index = 0;
```

with

```JavaScript
const [ index , setIndex ] = useState ( 0 ) ;
```

> index is a state variable and setIndex is the setter function.

## useState Hook

- In React, useState , as well as any other function starting with ”**use**”, is called a Hook.

- Hooks are special functions that are only available while React is rendering. They let you “hook into” different React features.

- Hooks—functions starting with ”**use**” —can only be called at the top level of your components or your own Hooks.

## Analysis of useState

When you call useState , you are telling React that you want this component to remember something:

```JavaScript
const [ index , setIndex ] = useState ( 0 );
```

- In this case, you want React to remember "**index**".

- The only argument to useState is the initial value of your state variable. In this example, the index’s initial value is set to 0 with useState(0).

- Every time your component renders, useState gives you an array containing two values:

1. The state variable ( index ) with the value you stored.
2. The state setter function ( setIndex ) which can update the state variable and trigger React to render the component again.

```JavaScript
const [ index , setIndex ] = useState ( 0 );
```

## Behind the scene

1. Your component renders the first time. Because you passed 0 to useState as the initial value for index , it will return **[0, setIndex]** . React remembers 0 is the latest state value.

2. You update the state. When a user clicks the button, it calls setIndex(index + 1). index is 0 , so it’s setIndex(1). This tells React to remember index is 1 now and triggers another render.

3. Your component’s second render. React still sees useState(0), but because React remembers that you set index to 1 , it returns **[1, setIndex]** instead. And so on!

- You can have as many state variables of as many types as you like in one component.

- State is isolated and private State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other.

## Recap

- Use a state variable when a component needs to **“remember”** some information between renders.

- State variables are declared by calling the useState Hook.

- Hooks are special functions that start with **"use"** . They let you **“hook into”** React features like state.

- Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including useState , is only valid at the top level of a component or another Hook.

The useState returns a pair of values:

1. The current state.
2. And the function to update it.

- You can have more than one state variable. Internally, React matches them up by their order.

- State is private to the component. If you render it in two places, each copy gets its own state.
