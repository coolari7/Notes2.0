# Express Notes

This README was originally created on **11th November** to compile express security best practices.

## Security

<details>
<summary><b>1. Request Size Limits</b></summary>
<p>

* Hackers can send large data <code style="color:#ca3433;">500 MB - 1 GB</code> as request bodies.
* Since express buffers request bodies and parses it into meaningful data structures, large request bodies can crash the single-thread (*as it stays in memory while the request is being fulfilled*).
* To resolve this issue, add the express middlewares:

```javascript
// Content-Type: X-www-url-formencoded
app.use(express.urlencoded({ limit: "1kb" }))

// Content-Type: application/json
app.use(express.json({ limit: "1kb" }))

// Content-Type: multipart/form-data
// Essentially for uploading files
app.use(express.multipart({ limit: "100mb" })

// Other Data
// This has to be the last "limit" middleware
// otherwise, the rest won't be caught
app.use(express.limit("2kb"))
```

* If the request bodies violate the imposed limit, a ``413 Payload Too Large`` response will be sent.

</p>
</details>

<details>
<summary><b>2. Response Headers</b></summary>
<p>

* Internal implementation of the server can be disclosed in the response headers:

```javascript
// Hackers can check for exploits applicable 
// to the specific server or framework

X-Powered-By: "Express"
Server: "nginx/1.6.2"
```

* To resolve this issue, install the helmet package,

```javascript
npm install helmet
```

And set the following headers in the least:

```javascript
// prevents clickjacking (opening of pages in iframes)
app.use(helmet.frameguard())

// prevents the browser from caching and storing the page
app.use(helmet.noCache())

// lets us set a whitelist of domains that can load resources
app.use(helmet.contentSecurityPolicy())

// allow communication in HTTPS only
app.use(helmet.hsts())

// Enables X-XSS-Protection header, for basic Cross Site Scripting
// protection
app.use(helmet.xssFilter())

// Keeps browser from sniffing mimetypes
app.use(helmet.noSniff())
```

</p>
</details>

<details>
<summary><b>3. Root Privileges</b></summary>
<p>

> **DO NOT DO IT!!**

* Developers can attain root privileges to access ports below 1024.
* Or in the event of a 3rd party package failing to run without root privileges.
* In the event of a hacker hacking the application, he/she will have ***total access to the machine***, and do as he/she pleases

</p>
</details>

<details>
<summary><b>4. Secure Connection (HTTPS)</b></summary>
<p>

* The first step in creating a secured server using express is to obtain certificate and a signed key. This can be done using [openssl](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)
* After you've obtained the ``key.pem`` and the ``cert.pem``, include them (by using the <span style="color:#ca3433;">fs</span> module) in an <span style="color:#ca3433;">options</span> object, that will be passed to the ``https`` server. 

```javascript
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  honorCipherOrder: true,
  ciphers: "<mention-cipher-here",
  handshakeTimeout: 5000,
  secureOptions: "<mention-ssl-options-here>"
}
```

* Pass <code style="color:#ca3433;">options</code> and the express <code style="color:#ca3433;">app</code> to the <code style="color:#ca3433;">https.createServer()</code> function and proceed to listen as usual.

More information on options can be found on the **http**, **https** and **tls** guides of the [nodejs api](https://nodejs.org/api/).
</p>
</details>

<details>
<summary><b>5. Cookie Safety</b></summary>
<p>

* Cookies are usually sent in plaintext. [Here](https://expressjs.com/en/5x/api.html#res.cookie) is a list of options that the <code style="color:#ca3433;">res.cookie(key, value[, options])</code> can take.
* Specifically, <code style="color:#ca3433;">secure: true</code> and <code style="color:#ca3433;">httpOnly: true</code> are important.
* Secure key mandates that the cookie is to be used by **https endpoints only**
* HttpOnly key mandates that client-side access to cookies is restricted, so malicious code (XSS attack) won't have access to information in the cookies

</p>
</details>

<details>
<summary><b>6. Rate Limiting</b></summary>
<p>

* Rate limiting can prevent brute force attacks by a large extent
* Essentially blocks all request calls by sending back a <code style="color:#ca3433;">429 Too Many Requets</code> response once a certain number of failed attempts has taken place
* There are several npm packages that can assist with ratelimiting. Suggest one is:

```javascript
npm install ratelimiter
```

* [Here](https://cloud.google.com/solutions/rate-limiting-strategies-techniques#techniques-enforcing-rate-limits) is how rate-limiting works (algorithm-wise)

</p>
</details>

<details>
<summary><b>7. Code Sanitization</b></summary>
<p>

* **XSS Attacks** are client-side attacks that occur due to the injection of malicious scripts/code
* Malicious code injected in the browser can gain access to  confidential information stored in cookies, localStorages or sessionStorages
* Absence of code sanitization can lead to Reflected/Stored XSS attacks.
* Use of validators such as ``express-validator`` can assist in preventing such attacks

```javascript
npm install express-validator
```

And use it as such:

```javascript
const { body } = require("express-validator");

// escape() essentially replaces <, >, &, ', " and / with HTML entities
app.post("/user", body().escape())
```

* ``xss-filters`` is another package that can assist with the prevention of Cross Site Scripting (XSS) attacks.

</p>
</details>

<details>
<summary><b>8. Content Security Policy</b></summary>
<p>

* One way to prevent XSS attacks is to set the ``Content-Security-Policy`` header
* Setting values for ``default-src`` and ``script-src`` will make sure that scripts run in the browser belong to the list of values
* ``helmet`` helps in setting the CSP header. Check it [here](https://www.npmjs.com/package/helmet#reference) within the CSP collapsible

```javascript
// The destructure is essential as it sets the defaults
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "*.example.com"],
      "default-src": ["'self'", "*.ourdomain.com"]
    },
  })
);
```

</p>
</details>

<details>
<summary><b>9. CSRF Protection</b></summary>
<p>

* Cross Site Request Forgery is a form of attack where false requests are made from an authenticated user's browser.
* The logic behind preventing CSRF attacks is to use an **anti-csrf** token, that will be generated every time the form loads. This token will be sent to the server with each request. All request without the token will throw 403 errors.
* The ``csruf`` module helps in implementing CSRF protection. Go through it's [npm page](https://www.npmjs.com/package/csurf) to learn more.
* Focus on the **SPA** topic in the page.

</p>
</details>

## License

[MIT](https://choosealicense.com/licenses/mit/)
