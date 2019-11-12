# Auth Notes

- its about the client (software) connecting to the API, its not about the user that is logged in. 
- to the server, the same user on the same computer connected from insomnia is different from the same user connected from the browser.
- the server has amnesia, it will not remember the client across requests.
    --- http is stateless, there is no common data shared between client and server.
- We need a way to help the server *"remember" the client across requests.*

## Cookies

- a cookie is a container of data
- a browser will automatically send cookies on every request to the *domain* associated with the cookie
- the client will store the cookie in a special place [ and it isn't called a cookie jar ]

A server can send a _header_ (Set-Cookie) suggesting to the client that it stores a _cookie_.

The client sends the cookies in a _Cookie_ header back to the server.

## Sessions

- like a database.
- used to store data on the server, much like a database.

