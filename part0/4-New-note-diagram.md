#### User creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST form data (new note) as HTML document
    activate server
    Note left of server: Server appends the note text to data.json
    server->>browser: response code 302
    deactivate server
    
    Note right of browser: HTTP 302 triggers reload
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML page
    deactivate server
    
    Note right of browser: <link> tag
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS stylesheet
    deactivate server
    
    Note right of browser: <script> tag
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
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