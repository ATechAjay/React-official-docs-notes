# Conditional Rendering

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if statements`, `&&`, and `?: operators`.

# Conditionally returning JSX

Let’s say you have a `PackingList` component rendering several Items, which can be marked as packed or not:

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

Notice that some of the Item components have their `isPacked` prop set to `true` instead of `false`. You want to add a checkmark `(✔)` to packed items if `isPacked={true}`.

```jsx
if (isPacked) {
  return <li className="item"> {name} ✔ </li>;
}
return <li className="item"> {name} </li>;
```

If the `isPacked` prop is true, this code returns a different JSX tree. With this change, some of the items get a checkmark at the end:

```jsx
function Item({ name, isPacked }) {
  // Conditional rendering.
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

# Conditionally returning nothing with `null`

In some situations, you won’t want to render anything at all. Let's say you don’t want to show packed items at all if they are true. `A component must return something`. In this case, you can return `null`:

```jsx
// If packed items are true, then it returns true.
if (isPacked) {
  return null;
}
return <li className="item"> {name} </li>;
```

If `isPacked` is true, the component will return nothing, `null`. Otherwise, it will return JSX to render.

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}
```

In practice, returning `null` from a component isn’t common because it might surprise a developer trying to render it. More often, you would conditionally include or exclude the component in the parent component’s JSX. Here’s how to do that!

# Conditionally including JSX

In the previous example, you controlled which JSX tree would be returned by the component. You may already have noticed some duplication in the render output:

```jsx
<li className="item"> {name} ✔ </li>
```

**is very similar to**

```jsx
<li className="item"> {name} </li>
```

Both of the conditional branches return `<li className="item">...</li>`:

```jsx
if (isPacked) {
  return <li className="item"> {name} ✔ </li>;
}
return <li className="item"> {name} </li>;
```

While this duplication isn’t harmful, it could make your code harder to maintain. What if you want to change the `className`? You’d have to do it in two places in your code!

> In such a situation, you could conditionally include a little JSX to make your code more `DRY`.

# Conditional (ternary) operator `(? :)`

JavaScript has a compact syntax for writing a conditional expression — the conditional operator or `“ternary operator”`. Instead of this:

```jsx
if (isPacked) {
  return <li className="item"> {name} ✔ </li>;
}
return <li className="item"> {name} </li>;
```

You can write this:

```jsx
return <li className="item"> {isPacked ? name + " ✔" : name} </li>;
```

> You can read it as `“if isPacked is true, then render `name + ' ✔'`, otherwise  render `name`”`.

---

###### Are these two examples fully equivalent?

If you’re coming from an object-oriented programming background, you might assume that the two examples above are subtly different because one of them may create two different `“instances”` of `<li>`.

But JSX elements aren’t `“instances”` because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints.

So these two examples are completely equivalent. Preserving and Resetting State goes into detail about how this works.

---

Now let’s say you want to wrap the completed item’s text into another HTML tag, like `<del>` to strike it out. You can add even more newlines and parentheses so that it’s easier to nest more JSX in each of the cases:

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{isPacked ? <del>{name + " ✔"}</del> : name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

This style works well for simple conditions, but use it in moderation. If your components get messy with too much nested conditional markup, consider extracting child components to clean things up.

In React, markup is a part of your code, so you can use tools like `variables` and `functions` to tidy up complex expressions.

# Logical AND operator `(&&)`

Another common shortcut you’ll encounter is the JavaScript logical `AND (&&)` operator. Inside React components, it often comes up when you want to render some JSX when the condition is `true`, or render nothing otherwise.

With `&&`, you could conditionally render the checkmark only if `isPacked` is true:

```jsx
return (
  <li className="item">
    // If the isPacked is true, then it return the checkmark. Otherwise will not
    return anything.
    {name} {isPacked && "✔"}
  </li>
);
```

> You can read this as “if isPacked , then render the checkmark, otherwise, render nothing”.

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

A JavaScript `&&` expression returns the value of its right side (or the last item) if the left side is true. But if the condition is false, the whole expression becomes false. React considers false as a `“hole”` in the JSX tree, just like `null` or `undefined`, and doesn’t render anything in its place.

There is a pitfall, don’t put numbers on the left side of &&. To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is 0, then the whole expression gets that value `(0)`, and React will happily render 0 rather than nothing.

For example, a common mistake is to write code like `messageCount && <p>New messages</p>`. It’s easy to assume that it renders nothing when `messageCount` is 0, but it renders the 0 itself!

To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

# Conditionally assigning JSX to a variable

When the shortcuts get in the way of writing plain code, try using an `if statement` and a `variable`. You can reassign variables defined with `let` keyword, so start by providing the default content you want to display, the name:

```jsx
let itemContent = name;
```

Use an `if statement` to reassign a JSX expression to `itemContent` if `isPacked` is true:

```jsx
if (isPacked) {
  itemContent = name + " ✔";
}
```

Curly braces open the `“window into JavaScript”`. Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside of JSX:

```jsx
<li className="item"> {itemContent} </li>
```

This style is the most verbose, but it’s also the most flexible. Here it is in action:

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return <li className="item">{itemContent}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

Like before, this works not only for text but for arbitrary JSX too:

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
```
