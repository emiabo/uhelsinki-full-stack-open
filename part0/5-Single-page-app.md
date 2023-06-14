#### User goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: HTML page
    deactivate server
    
    Note right of browser: <link> tag
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS stylesheet
    deactivate server
    
    Note right of browser: <script> tag
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>browser: JS script
    deactivate server
    
    Note right of browser: main.js sends XMLHttpRequest
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: JSON object string, with the new note included
    deactivate server

    Note right of browser: Browser executes onreadystatechange function, which renders the JSON to an <ul> and inserts into DOM
```