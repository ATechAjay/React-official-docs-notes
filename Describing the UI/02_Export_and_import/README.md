Importing and Exporting Components
The magic of components lies in their reusability: you can create components that are composed of other components. But as you nest more and more components, it often makes sense to start splitting them into different files. This lets you keep your files easy to scan and reuse components in more places.
The root component file
In Your First Component , you made a Profile component and a Gallery component that renders it:
These currently live in a root component file, named App.js in this example. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.
Exporting and importing a component
What if you want
move Gallery and Profile out of the root component file.
This will make them more modular and reusable in other files. You can move a component in three steps:
Make a new JS file to put the components in. Export your function component from that file (using either default or named exports). Import it in the file where you’ll use the component (using the corresponding technique for importing default or named exports).
Here both Profile and Gallery have been moved out of App.js into a new file called Gallery.js . Now you can change App.js to import Gallery from Gallery.js :
Notice how this example is broken down into two component files now: Gallery.js : Defines the Profile component which is only used within the same file and is not exported. Exports the Gallery component as a default export. App.js : Imports Gallery as a default import from Gallery.js . Exports the root App component as a default export.
Note You may encounter files that leave off the .js file extension like so: import Gallery from './Gallery' ; Either './Gallery.js' or './Gallery' will work with React
Default vs named exports
There are two primary ways to export values with JavaScript: default exports and named exports. So far, our examples have only used default exports. But you can use one or both of them in the same file. A file can have no more than one default export, but it can have as many named exports as you like.
How you export your component dictates how you must import it. You will get an error if you try to import a default export the same way you would a named export! This chart can help you keep track:
When you write a default import, you can put any name you want after import . For example, you could write import Banana from './Button.js' instead and it would still provide you with the same default export. In contrast, with named imports, the name has to match on both sides. That’s why they are called named imports!
People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values. Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like export default () => {} , are discouraged because they make debugging harder.
Exporting and importing multiple components from the same file
What if you want to show just one Profile instead of a gallery? You can export the Profile component, too. But Gallery.js already has a default export, and you can’t have two default exports. You could create a new file with a default export, or you could add a named export for Profile . A file can only have one default export, but it can have numerous named exports!
Note To reduce the potential confusion between default and named exports, some teams choose to only stick to one style (default or named), or avoid mixing them in a single file. Do what works best for you!
First, export Profile from Gallery.js using a named export (no default keyword): export function Profile ( ) { // ... }
Then, import Profile from Gallery.js to App.js using a named import (with the curly braces): import { Profile } from './Gallery.js' ;
Finally, render <Profile /> from the App component: export default function App ( ) { return < Profile /> ; }
Now Gallery.js contains two exports: a default Gallery export, and a named Profile export. App.js imports both of them.
Now you’re using a mix of default and named exports: Gallery.js : Exports the Profile component as a named export called Profile . Exports the Gallery component as a default export. App.js : Imports Profile as a named import called Profile from Gallery.js . Imports Gallery as a default import from Gallery.js . Exports the root App component as a default export.
