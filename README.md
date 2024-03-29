# Website / Web App for LC Industrial

The _public-facing_ side of the website is meant to draw in more customers and facilitate easier communication with LC Industrial. For members of the company, there is also access to the **inventory management web app.** The app is only accessible by logging in. For the authentication system, I implemented session-based Single Factor Authentication using Passport.js. By configuring CORS, cookie settings, and setting up CSRF tokens, I ensured that data was safe against common web vulnerabilities like Cross-Site Scripting and CSRF, following guidelines from [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#synchronizer-token-pattern).

I deployed this website to a DigitalOcean server using Apache. You can check it out at [lcindustrial.ca](https://lcindustrial.ca)!
## Home Page:
![image](readme-images/Home1.png)


# App:
I made this web app as an inventory management system for LC Industrial Services. The company has a large inventory of parts, so tracking and searching data on these parts in a manageable way was very difficult for them.

## What does the app do?
The app keeps track of information like Part Number, Supplier, Quantity, Price, and others. 
With this web app, they're able to now catalog their parts and easily maintain a database with part information thanks to the search, editing, and adding functionality.

### Searching For Parts:
#### Select from a number of fields:
![image](readme-images/Search3.png)

#### Dynamically add to fields:
![image](readme-images/Search4.png)

### Editing Parts:
![image](readme-images/Edit1.png)

### Adding New Parts:
![image](readme-images/Add1.png)




## What did I learn?
I made this app using a React front-end, an Express back-end for the API and a MySQL database. I learned a lot about managing data in all stages of the application, from the front-end form to the back-end API and finally the SQL query for the database. When configuring authentication, I learned more about cookies and client/server interactions. I also learned how to properly protect my website and server on the internet by implementing session-based authentication, protecting API endpoints, CSRF tokens, and configuring my security to protect against XSS.







