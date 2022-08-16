# Welcome to DisneySearch

![Disney search](https://i.giphy.com/media/JUh0yTz4h931K/giphy.webp)

**Welcome welcome**, today we are going to find some of your favourites Disney characters and even create some! 👻👻👻

The data we are going to use is in `./disney.json` file.

To search through this data, we are going to create our own server with different routes which we will be able to use with `Postman`.

## TLDR

- GET /characters : should get all characters
- GET /characters?name=jasmine : should get jasmine
- GET /characters/4703 : should get character with _id 4703

- POST /characters : receives a character object { name, films }. and adds it as { name, films, _id } to our characters. _id should be equal to _id of last character + 1. responds with the created character. [Example response](#iteration-4-lets-create-some-characters)

- Bonus: GET /characters?film=roblop : should get characters from Roblop film
- Bonus: GET /characters?film=roblop&name=roblop : should get Roblop character from Roblop film

**Consider refactoring to avoid creating new routes**

## **Iteration 1: Getting started**

- Create a `app.js` file where you will write all of your server logic.
- initialize your folder with `npm init -y`
- Install express and using `npm install express`
- Install nodemon as a Dev dependency using `npm install -D nodemon`
- You might want to write a script in your `package.json` which will launch your server.
  - Something like `"dev": "nodemon ./app.js"` should do the trick.
  - To run a script, you can use `npm run name-of-your-script`, in our case `npm run dev`
- You will want to import (require) the `disney.json` file and store it in a variable.

### App.js file

> To have access to express, you will first need to require it in your `app.js`.
> `const express = require('express')`
> Now you will need to create your application. The `express` variable is actually a function which when executed returns you an object with various methods. You might want to save this object in a variable named `app` (That's just convention 😁)

### Using the app

Your server (named `app`) should get started, your server should `listen` 👀 to a port (We usually put 3000 for a port)

## **Iteration 2: Let's create some routes**

We'd like to see all of the characters, there's thousands of them so that's not super usefull but we'll improve that later on.

Let's create a `GET` route on the `/characters` endpoint. This route should respond with all of our characters (previously imported) as json.

You can test your Route either in your browser by going to [your server port on localhost](http://localhost:3000) or by using Postman (Which is recommended 😊)

### Let's find some of the characters we like

We'd like to find some characters by their `name`, instead of displaying everything. to do so we will use a query, the key of that query should probably be `name`
Now in the previously created `GET` route, try accessing the [query](https://expressjs.com/fr/api.html#req.query).
If you receive the query `name` filter the characters with a matching name! Or better yet, try using [includes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

If the route do not receive any query you can respond with all the characters.

Test your route on Postman 📬️

## **Iteration 3: Get their ID's**

We want to be able to display a single character, by chance, all of the characters have an unique `_id`.
By going to the endpoint `/characters/4703` we would like to display only `Mickey Mouse`, we will use the `params` to do so.

Create a new `GET` route which accept a parameter, you will probably name it `id`.
Use the `find` Higher order Function to... Find the character with the same `_id`
If you find him, you should respond with the character, else send an error message. (It could be as simple as `res.json({message: 'No character found!'})`
If you can't find him, make sure to verify the type of the params you're receiving and the type of the id you're comparing it to.

Test your route on Postman 📬️

## **Iteration 4: Let's create some characters**

Now we would like to add some characters!
For simplicity, let's just create a character with three fields : `name`, `films` and `_id`.
But before we do so, to be able to read the informations that are posted, we need to parse the body of the request.
To do so you just need to add a simple line before the post route : `app.use(express.json())`

Let's now create our first `POST` route!
When doing a `post` on the `/characters` endpoint, you should get the informations (`name` and `films`) from the body of the request.
Now we need to create the `_id`, it seems like a good option to take the `_id` of the [last character](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/at) and just increment it by 1.

you might end up with something like this:

```js
const characterToCreate = { name, films, _id }
```

you can now push your new character to the characters Array and then respond with a message and the character you just added like so:
![Roblop](https://i.imgur.com/812Nvc2.png)

## **Bonuses!**

We never use the `films` key in our request!
But it could be really nice to be able to get all the character from a specific movie...
In the `GET` route which receive some query We could search in all our characters the ones that appear in a movie and then even combine it with the `name` query 🤯

Transform your `GET` route which handle the queries so it looks like this:

```js
let result = [...characters]
  if (film) {
    /**
     * A character can be in multiple movies, we will want to filter the characters
     * based on the fact that the film variable (the film name) is included in atleast some
     * of the films of a character.
     */
    result = // Your code :)
  }
  if (name) {
    result = // Your previous code (with a little edit) for the name could be here!
  }
  res.json(result)
```

[some](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some) might be handy at some point here !

As a last touch, this route is getting long, maybe we could refactor it?

Happy coding 😄
