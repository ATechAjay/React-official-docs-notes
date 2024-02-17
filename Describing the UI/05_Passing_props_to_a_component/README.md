# Passing Props to a Component

React components use `props` to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including `objects, arrays, and functions`.

# Familiar with props

Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
```

# Passing props to a component

In this code, the Profile component isn’t passing any props to its child component, `Avatar`:

```jsx
export default function Profile() {
  return <Avatar />;
}
```

You can give Avatar some props in two steps.

### Step 1: Pass props to the child component

First, pass some props to `Avatar`. For example, let’s pass two props: `person` (an object), and `size` (a number):

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

> If double curly braces after `person=`, they’re merely an object inside the JSX curlies.

Now you can read these props inside the `Avatar` component.

# Step 2: Read props inside the child component

You can read these props by listing their names `person`, `size` separated by the commas inside `({...})` directly after the `function Avatar`. This lets you use them inside the Avatar code like you would with a variable.

```jsx
function Avatar({ person, size }) {
  // person and size are available here
}
```

Props let you think about parent and child components independently. For example, you can change the `person` or the `size` of props inside `Profile` without having to think about how `Avatar` uses them. Similarly, you can change how the `Avatar` uses these props, without looking at the `Profile`.

The props are the only argument for your component! React component functions accept a single argument, a `props` object:

Usually, you don’t need the whole props object itself, so you destructure it into individual props.

### Note

Don’t miss the pair of `{ ... }` curlies inside of `( ... )` when declaring props:

```jsx
function Avatar({ person, size }) {
  // ...
}
```

This syntax is called `“destructuring”` and is equivalent to reading properties from a function parameter:

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

# Specifying a default value for a prop

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting `=` and the default value right after the parameter:

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

Now, if `<Avatar person={...} />` is rendered with no size prop, the size will be set to `100`. The default value is only used if the `size` prop is missing or if you pass `size={undefined}`. But if you pass `size={null}` or `size={0}`, the default value will not be used.

# Forwarding props with the JSX spread syntax

Sometimes, passing props gets very repetitive:

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

There’s nothing wrong with repetitive code — it can be more legible. But at times you may value conciseness. Some components forward all of their props to their children, like how this `Profile` does with `Avatar`. Because they don’t use any of their props directly, it can make sense to use a more concise `“spread”` syntax:

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

This forwards all of `Profile`’s props to the `Avatar` without listing each of their names. Use spread syntax with restraint. If you’re using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX.

# Passing JSX as children

It is common to nest built-in browser tags:

```html
<div>
  <img />
</div>
```

Sometimes you’ll want to nest your components the same way:

```jsx
<Card>
  <Avatar />
</Card>
```

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. For example, the `Card` component below will receive a `children` prop set to `<Avatar/>` and render it in a wrapper div:

You can think of a component with a `children` prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX. You will often use the `children` prop for visual wrappers: panels, grids, etc.

# How props change over time

The Clock component below receives two props from its parent component: `color` and `time`.

```jsx
export default function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}
```

This example illustrates that a component may receive different props over time. Props are not always static! Here, the `time` prop changes every second, and the `color` prop changes when you select another color. Props reflect a component’s data at any point in time, rather than only in the beginning.

However, props are `immutable` — a term from computer science meaning `“unchangeable”`. When a component needs to change its props (for example, in response to user interaction or new data), it will have to “ask” its parent component to pass it different props — a new object! Its old props will then be cast aside, and eventually, the JavaScript engine will reclaim the memory taken by them.
