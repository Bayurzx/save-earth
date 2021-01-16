<!--- STARTEXCLUDE --->
# Save Earth with Astra

Create entries of newly discovered, rare, or near-extinct life discoveries on earth for the world to see!

<!---Add Image here --->

## Stack Highlights 🥪🥪🥪
### This web app makes use of :
- Reactjs : Render components from your db and make them dynamic and responsive to user input.
- Netlify : Are you new to Netlify, so was I when I started this project. It's easy to learn. Provides a powerful serverless platform that's easy to scale
- Astra DataStax : Also my first time using Astra, You can easily perform CRUD operations with Astra Collections. Astra's edge is at their low latency and high-write operations suitable for BigData ops.

## You Should Know That...
*while this was created to be serverless with Netlify and 96% of operations are carried out using Netlify and Astra it does use a tiny weenie bit of backend for Authentication and only authentication(signup and signin) why?... For Security..., because it was easier... who knows! I would need you to get waaay off my back, it's my app! Now let's get started.*

# Why???
This app was designed for the explorers, adventurers of the world. It is a way for you to feature something weird you saw from any where on earth and save it. Hence, Save-Earth get it... 😁☺😓😓

# How???
Give it a name, add a caption, give some description, tell us where you saw it. Take a pic, sned us the link, just the link please.
When adding a location have in mind that the app uses `Google Geocoder API` So use a language Google map will understand. It also uses `Google Javascript Map API` for exact coordinates all will integrated into the React App

# Who??
Like I said earlier, It's for the freaks who care about nature... like us, NGOs that care about what's on earth, etc...

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

### After having your DB set, you can use this as template on github
*Make sure to get the backend for authentication at 👉* [save-earth-BE](https://github.com/Bayurzx/save-earth-BE)
