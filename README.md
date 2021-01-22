<!--- STARTEXCLUDE --->
# Save Earth with Astra

Create entries of newly discovered, rare, or near-extinct life discoveries on earth for the world to see!

<!---Add Image here --->
![image](https://raw.githubusercontent.com/Bayurzx/save-earth/footer/screenshots/Home.jpg)
![image](https://raw.githubusercontent.com/Bayurzx/save-earth/footer/screenshots/Details.jpg)
![image](https://raw.githubusercontent.com/Bayurzx/save-earth/footer/screenshots/footer2.jpg)


## Stack Highlights 🥪🥪🥪
### This web app makes use of :
- Reactjs : Render components with data from your db and make them dynamic and responsive to user input.
- Netlify : Are you new to Netlify, so was I when I started this project. It's easy to learn. Provides a powerful serverless platform that's easy to scale
- Astra DataStax : Also my first time using Astra, You can easily perform CRUD operations with Astra Collections. Astra's edge is at their low latency and high-write operations suitable for BigData ops.

## You Should Know That...
*while this was created to be serverless with Netlify and 96% of operations are carried out using Netlify and Astra it does use a tiny weenie bit of backend for Authentication and only authentication(signup and signin) why?... For Security..., because it was easier... who knows! I would need you to get waaay off my back, it's my app! Now let's get started.*

# Why???
This app was designed for the explorers, adventurers of the world. It is a way for you to feature something weird you saw from any where on earth and save it. Hence, Save-Earth get it... 😁☺😓😓

# How???
Give it a name, add a caption, give some description, tell us where you saw it. Take a pic, send us the link, *just the link please*.
When adding a location have in mind that the app uses `Google Geocoder API` So use a language Google map will understand. It also uses `Google Javascript Map API` for exact coordinates all well integrated into the React App, so, don't forget to click the coordinate button!

# Who??
Like I said earlier, It's for we, the environmental freaks, who care about nature... NGOs, scientist, researchers, explorers etc... that care about what's on earth, etc...

---
# Checkout the site here 👉 [saveearth](https://saveearth.xyz/) 👈
---
- First, signup and then signin (ensure your password has the following: alphanumeric, symbol and one capital letter)
- Upload link only show after signin
- Feel free to explore and create your own discovery
- The donation is in a sandbox for now (braintree) feel free to use this fake card detail for testing:
    4111 1111 1111 1111
    12/22

# Setup

## Setup Astra
---
### First of all I would like to thank astra for giving me 5GB free, no credit card required `Wondering the catch?` Me too... tell if you find one.
---
### DataStax Astra
1. Create a [DataStax Astra account](https://astra.datastax.com/register) if you don't
already have one:
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-register-basic-auth.png)

2. On the home page. Locate the button **`Add Database`**
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-dashboard.png)

3. Pick **free plan** and a **region** close to you, click configure.
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-1-top.png)
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-1-bottom.png)

4. Define a **database name**, **keyspace name** and **credentials** (Take note of the DB Password)
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-2.png)

5. Your Astra DB will be ready when the status will change from *`Pending`* to **`Active`** 💥💥💥
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-db-active.png)

6. After your database is provisioned, head to the `Connect` screen and copy your connection
information (we'll need this later!):
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-connect.png)

### After having your DB set, you can use this as a template on github, click the <use as template> button  👆 or...
---
Clone to your local machine...
`git clone <put copied git link here>`

Install all dependencies in package.json
`npm install`

While that is working, you should sort out your .env file, go to the .env.sample file you will get details on your environment variables

While you can run the app with `npm start` I would advise using `npx netlify dev` to enable you utilize netlify-functions

Happy coding!

*Make sure to get the backend for authentication at 👉* [save-earth-BE](https://github.com/Bayurzx/save-earth-BE)
Note that after signup, you can switch the role from regular user => `user: 0` to Administrator => `admin:1` at the backend
