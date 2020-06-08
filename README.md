# Recipes Database

User can search for recipes by keyword in the categories of meals, desserts, or drinks.  

[Live Site](https://benhsieh-dev.github.io/recipes-database/)

## Technologies Used

* JavaScript
* Edmamam API
* HTML5
* CSS3
* Firebase Database

Some of chanllenges that I ran into were as follows: 
 1. Trying to refresh favorite recipes page on each new favorite added. 
 2. Deleting an individual recipe from favorites without wiping out the entire database. 

I over came these issues by including firebase configurations on the index.html page. 

```javascript
  const firebaseConfig = {
            apiKey: "AIzaSyDm5HreoqHLeMO9-4c0HAWMEjjYkScCqfM",
            authDomain: "recipes-database-fb21c.firebaseapp.com",
            databaseURL: "https://recipes-database-fb21c.firebaseio.com/",
            projectId: "recipes-database-fb21c",
            storageBucket: "recipes-database-fb21c.appspot.com"
        };
        firebase.initializeApp(firebaseConfig);
```
The api key allowed me to work with firebase using the documentation, which led to the following code that solved the deletion issue. 

```javascript
document
          .querySelector(`[data-fav-recipe="${k}"]`)
          .addEventListener("click", function(event) {
            event.preventDefault();
            const oneRecord = firebase.database().ref('recipes/' + k)
            oneRecord.remove()
              .then(function() {
                console.log("Remove succeeded.");
                elements.favorites.innerHTML = "";
                setTimeout(function(){
                  getData();
                }, 500);
              })
              .catch(function(error) {
                console.log("Remove failed", error)
              })
          });
```
    


