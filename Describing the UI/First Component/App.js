import React from "react";
import ReactDOM from "react-dom/client";

// Step 1:
// const reactElement = React.createElement("h1", {}, "This is heading 1");

function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}

function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

// Step 2:
const rootElement = ReactDOM.createRoot(document.querySelector(".root"));

// Step 3:
rootElement.render(<Gallery />);
