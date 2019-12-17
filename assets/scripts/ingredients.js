// get local storage or set item to []
let savedDrinks = JSON.parse(localStorage.getItem('savedDrinks')) || [];

/**
    * Get Cocktail by CocktailId
    * @param {Number} id Unique ID of the drink you want the details for
    * @param {Function} renderFn Function where you can manipulate the data and render content
    * Your render function should accept 3 arguments, drink name, drink image url and the ingredients
    * you create the renderFn and pass it in like so:
    * @usage getDetail(11415, renderIngredients);
    */
   let thisDrink = ''
function getDetail(id, renderFn) {
    let url = buildUrl("lookup") + "i=" + id;
    getData(url).done(result => {
        result = result.drinks[0];

        let ingredients = extractIngredients(result);

        // pass the Name of the drink, the image, and the ingredients 
        // to the render function
        renderFn(result.strDrink, result.strDrinkThumb, ingredients);
    });
}

/**
 * Create and return an Object Array of ingredients from the argument data
 * @param data Drink object
 * @returns ingredients
 */
function extractIngredients(data) {
    let ingredients = [];
    let idx = 1;
    let ingredientsNotFound = true;

    while (ingredientsNotFound) {
        if (data[`strIngredient${idx}`] != null) {
            ingredients.push({ ingredient: data[`strIngredient${idx}`], measure: data[`strMeasure${idx}`] });
            idx++;
        } else {
            ingredientsNotFound = false;
        }
    }

    return ingredients;
}

/**
 * Renders a card with an image on the front and a recipe on the back
 * @param {String} strDrink 
 * @param {String} imgSrc 
 * @param {Object} ingredients
 */
function renderIngredients(strDrink, imgSrc, ingredients) {
    let cardBack = $(".flip-card-back");
    let ul = $("<ul>");
    $("#resultsImage").attr("src", imgSrc);

    for (let i = 0; i < ingredients.length; i++) {
        if (i === 0) {
            // create header on the first loop
            let title = $("<li>");
            title.html(`<h1>${strDrink}</h1>`);
            ul.append(title);
        }
        let li = $("<li>");
        let lineText = `${ingredients[i].measure || ""} ${ingredients[i].ingredient}`;
        li.text(lineText);
        ul.append(li);
    }

    // reset card container
    cardBack.text("");
    cardBack.append(ul);

    // hide loader display
    $(".loader").addClass("hidden");
}

/**
 * Get Random Cocktail with Optional query parameter
 * @param {String} q 
 */
function getRandomDetail(q) {
    $(".loader").removeClass("hidden");
    let url = buildUrl("random") + "q=" + q;
    getData(url).done(result => {
        getDetail(result.drinks[0].idDrink, renderIngredients);
        //console.log(result)
       thisDrink = result;

        // console.log(heartedDrinks)
    });
}

function renderAside() {
    let aside = $("<aside>");
    aside.addClass(['bg-blue-500', 'text-center', 'text-2xl', 'text-red-500']);

    let body = $("body");

    aside.attr("style", "cursor:pointer;width:300px;height:500px;z-index:1000;position:absolute;top:10%;transition:all 0.5s ease;");

    body.append(aside);

    let showAside = false;
    $('.logo-brand').on('click', function () {
        event.preventDefault();
        console.log('this', showAside);
        showAside = !showAside;
        let aside = $("aside");
        if (showAside) {
            aside.addClass("in");
            // aside.attr("style", "left:10px;");
        } else {
            aside.removeClass("in");
            // aside.attr("style", "left:-195px;");
        }
    });

    // add navigation
    let ul = $("<ul>");
    let qults;
    let pages = [{ home: "index.html" }, { results: "resultspage.html" }, { quiz: "quiz.html" }, { quizults: '#quizults' }];
    pages.forEach(val => {
        let key = Object.keys(val)[0];
        qults = $('<ul>');
        if (key === "quizults") {
            if (!savedDrinks || savedDrinks.length === 0) {
                // dont do things
            } else {
                // what about hearted drinks
                savedDrinks.forEach(rec => {
                    let drnk = $("<li>");
                    drnk.addClass(["text-right", "text-white", "bg-grey-500", "hover:text-black", "hover:bg-gray-500"]);
                    drnk.text(rec.strDrink);
                    drnk.on('click', function () {
                        event.preventDefault();
                        getDetail(rec.idDrink, renderIngredients);
                    });
                    qults.append(drnk);
                });
            }
        } else {
            let li = $("<li>");
            li.addClass('text-left');
            li.text(key);
            li.on("click", function () {
                window.location.href = val[key];
            });
            li.addClass(['uppercase', 'hover:text-white', "hover:bg-gray-500"]);
            ul.append(li);
        }
    })
    $("aside").append(ul);
    $("aside").append(qults);
}

renderAside();

// event handlers for like and dislike
$(".likeIcon").on("click", function () {
    // flag=true;
    
    console.log("liked")
    heartedDrinks.push(thisDrink)
    
    getRandomDetail()
    showHeartedDrinks()
});

$(".dislikeIcon").on("click", function () {
    // flag = false;
    getRandomDetail()
});

//store all the drinks the user "hearted" into this array
var heartedDrinks = []
var hdIndex = 0;
var flag = false;

//display list of hearted drinks in a list
function showHeartedDrinks(){

    let li = $("<li>");
    li.text(heartedDrinks[hdIndex].drinks[0].strDrink)
    hdIndex++;
    $("ul").append(li);
    // console.log(heartedDrinks[i].drinks[0].strDrink);
}
//store hearted drinks into locale storage

//get locale storage items and display



