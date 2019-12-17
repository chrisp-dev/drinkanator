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
        console.log(result.drinks[0]);

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
            console.log('in while: ', data[`strIngredient${idx}`]);
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
    });
}


// event handlers for like and dislike
$(".likeIcon").on("click", function () {
    getRandomDetail()
});

$(".dislikeIcon").on("click", function () {
    getRandomDetail()
});
