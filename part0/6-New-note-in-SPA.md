#### User creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: On form submit, spa.js creates a new note object with content field and a new Date(). It pushes this object to the global notes array, empties the form input box, re-renders and replaces the <ul> with an updated one, and finally opens this XMLHttpRequest.
    browser->>server: POST {content: "note text", date: "YYYY-MM-DDTHH:MM:SS.XXXZ"}
    activate server
    server->>browser: {message: "note created"}
    deactivate server
```