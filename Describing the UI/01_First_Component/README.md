# Your First Component

Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

##### Components: UI building blocks

On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and `<li>` :

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

This markup represents this article `<article>` , its heading `<h1>` , and an (abbreviated) table of contents as an ordered list `<ol>` . Markup like this, combined with CSS for style, and JavaScript for interactivity, lies behind every sidebar, avatar, modal, dropdown—every piece of UI you see on the Web.

React lets you combine your markup, CSS, and JavaScript into custom `components`, reusable UI elements for your app. The table of contents code you saw above could be turned into a `<TableOfContents />` component you could render on every page. Under the hood, it still uses the same HTML tags like `<article>` , `<h1>` , etc.

Just like with HTML tags, you can compose, order and nest components to design whole pages.

# Defining a component

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: `a React component is a JavaScript function` that you can sprinkle with markup.

```jsx
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

1. Step 1: Export the component

The `export default` prefix is a standard JavaScript syntax (not specific to React). It lets you mark the main function in a file so that you can later import it from other files.

2. Step 2: Define the function

With function `Profile() {...}` you define a JavaScript function with the name `Profile`.

> There is a Pitfall, React components are regular JavaScript functions, but their names must start with a capital letter or they won’t work!

3. Step 3: Add markup

The component returns an `<img/>` tag with `src` and `alt` attributes. `<img/>` is written like HTML, but it is actually JavaScript under the hood! This syntax is called `JSX` , and it lets you embed markup inside JavaScript. Return statements can be written all on one line, as in this component:

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

But if your markup isn’t all on the same line as the `return` keyword, you must wrap it in a pair of parentheses:

```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

> There is a pitfall Without parentheses, any code on the lines after `return will be ignored!`

# Using a component

Now that you’ve defined your `Profile` component, you can nest it inside other components. For example, you can export a `Gallery` component that uses multiple `Profile` components:

```jsx
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

# What the browser sees?

Notice the difference in casing: `<section>` is lowercase, so React knows we refer to an HTML tag. `<Profile/>` starts with a capital `P` , so React knows that we want to use our component called `Profile` . And `Profile` contains even more HTML:` <img/>`. In the end, this is what the browser sees:

```jsx
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

# Nesting and organizing components

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move `Profile` to a separate file.

Because the `Profile` components are rendered inside `Gallery` — even several times! — we can say that `Gallery` is a `parent component`, rendering each `Profile` as a `child`. This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

There is a pitfall, Components can render other components, but you must never nest their definitions:

```jsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

The snippet above is very slow and causes bugs. Instead, define every component at the top level, li,ke this one:

```jsx
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

When a child component needs some data from a parent, `pass it by props` instead of nesting definitions.

# Components all the way down

Your React application begins at a `root` component. Usually, it is created automatically when you start a new project.

Most React apps use components all the way down. This means that you won’t only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

React-based frameworks take this a step further. Instead of using an empty HTML file and letting React “take over” managing the page with JavaScript, they also generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to add interactivity to existing HTML pages. They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

Recap You’ve just gotten your first taste of React! Let’s recap some key points.

React lets you create components, reusable UI elements for your app. In a React app, every piece of UI is a `component`. React components are regular JavaScript functions except: Their names always begin with a capital letter``. They return JSX markup.
