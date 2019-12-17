/**
    * Get Cocktail by CocktailId
    * @param {Number} id Unique ID of the drink you want the details for
    * @param {Function} renderFn Function where you can manipulate the data and render content
    * Your render function should accept 3 arguments, drink name, drink image url and the ingredients
    * you create the renderFn and pass it in like so:
    * @usage getDetail(11415, renderIngredients);
    */
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
    $("#resultsImage").attr("src", imgSrc)

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
        heartedDrinks.push(result)
        //console.log(heartedDrinks)
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
    let pages = [{ home: "index.html" }, { results: "resultspage.html" }, { quiz: "quiz.html" }];
    pages.forEach(val => {
        console.log(val);
        let li = $("<li>");
        let key = Object.keys(val)[0];
        li.text(key);
        li.on("click", function () {
            window.location.href = val[key];
        });
        li.addClass('hover:text-white');
        ul.append(li);
    })
    $("aside").append(ul);
}

renderAside();

// event handlers for like and dislike
$(".likeIcon").on("click", function () {
    getRandomDetail()
});

$(".dislikeIcon").on("click", function () {
    getRandomDetail()
});

//store all the drinks the user "hearted" into this array
var heartedDrinks = []

//display list of hearted drinks in a list

//store hearted drinks into locale storage

//get locale storage items and display



