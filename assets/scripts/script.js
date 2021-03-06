// cocktail db stuff
let alcoholicFilters = {
    strAlcoholic: ["Alcoholic", "Non alcoholic", "Optional alcohol", null]
}

const apiHost = "https://the-cocktail-db.p.rapidapi.com/";
const endpoints = {
    lookup: "lookup.php?",
    filter: "filter.php?",
    random: "random.php?",
    ingredients: "list.php?i=list",
    glass: "list.php?g=list",
    categories: "list.php?c=list"
};

//global variables for the weather drink modal
var userTemp;
var drinkTitle;
var image;
console.log("global" + drinkTitle)


// response objects
// { drinks: [ 0: { "strCategory": "Cocktail" }, 1: { "strIngredient": "Lime" }, 2: { "strGlass": "Highball" } ] }

// https://rapidapi.com/developer/security/Drinkanator
const cocktailKey = 'f5fa4c0484mshad6cb57c6f05a3fp195dcejsn6e3f9016299c'

/**
 * Get Cocktail by CocktailId
 * @param {Number} id 
 */
function getById(id) {
    let url = buildUrl("lookup") + "i=" + id;
    getData(url).done(result => {
        console.log(result.drinks[0]);
        result = result.drinks[0];
        drinkTitle = result.strDrink
        $("#modalTitle").text(drinkTitle);
        console.log("test" + drinkTitle)
        weatherImage = result.strDrinkThumb;
        var image = $("<img>");
        image.addClass("weatherImage")
        image.attr("src", weatherImage)
        $("#p-text").append(image);
        var closeBtn = $("<button>");
        closeBtn.addClass("closeBtn")
        closeBtn.text("X")
        $(".modTitle").append(closeBtn)


        let ingredients = [];
        let idx = 1;
        let ingredientsNotFound = true;

        while (ingredientsNotFound) {
            if (result[`strIngredient${idx}`] != null) {
                ingredients.push({
                    ingredient: result[`strIngredient${idx}`],
                    measure: result[`strMeasure${idx}`]
                });
                console.log('in while: ', result[`strIngredient${idx}`]);
                idx++;
            } else {
                ingredientsNotFound = false;
            }
        }


        // cocktail db stuff
        let alcoholicFilters = {
            strAlcoholic: ["Alcoholic", "Non alcoholic", "Optional alcohol", null]
        }

        const apiHost = "https://the-cocktail-db.p.rapidapi.com/";
        const endpoints = {
            lookup: "lookup.php?",
            filter: "filter.php?",
            random: "random.php?",
            ingredients: "list.php?i=list",
            glass: "list.php?g=list",
            categories: "list.php?c=list"
        };


        // response objects
        // { drinks: [ 0: { "strCategory": "Cocktail" }, 1: { "strIngredient": "Lime" }, 2: { "strGlass": "Highball" } ] }

        // https://rapidapi.com/developer/security/Drinkanator
        const cocktailKey = 'f5fa4c0484mshad6cb57c6f05a3fp195dcejsn6e3f9016299c'

        /**
         * Get Cocktail by CocktailId
         * @param {Number} id 
         */
        function getById(id) {
            let url = buildUrl("lookup") + "i=" + id;
            getData(url).done(result => {
                console.log(result);
                renderDrinkInfo(JSON.stringify(result));
            });;
        }

        /**
         * Get Random Cocktail with Optional query parameter
         * @param {String} q 
         */
        function getRandom(q) {
            let url = buildUrl("random") + "q=" + q;
            getData(url).done(result => {
                renderDrinkInfo(result);
                renderIngredients(result);
            });
        }

        /**
         * Get items from filter endpoint
         * @param {String} q 
         */
        function getFilterBy(q) {
            // a=Alcoholic a=non-Alcoholic
            // c=Cocktail c=Champagne_flute
            // i=Lime i=Rum
            let url = buildUrl("filter") + "i=" + q;
            getData(url).done(result => {
                console.log("getfilterresult=")
                console.log(result);
                quizDrinkRecommendation.push(result)
                // getlistofdrinkIDs(result);
            });
        }

        console.log('TCL: INGREDIENTS: ', ingredients);
        console.log('TCLl Instructions: ', result.strInstructions)


        //render ingredients modal
        let modal = $('<div>');
        let title = $('<h3>');
        // title.text()
    });
}

/**
 * Get Random Cocktail with Optional query parameter
 * @param {String} q 
 */
function getRandom(q) {
    let url = buildUrl("random") + "q=" + q;
    getData(url).done(result => {
        renderDrinkInfo(result);
        renderIngredients(result);
    });
}

/**
 * Get items from filter endpoint
 * @param {String} q 
 */
function getFilterBy(q) {
    let url = buildUrl("filter") + "i=" + q;
    getData(url).done(result => {
        console.log(result);
        renderDrinkInfo(result);
    });
}

/**
 * Get items from filter endpoint
 * @param {String} q 
 */
function getFilterByQuiz(q, quizComplete) {
    let url = buildUrl("filter") + "i=" + q;
    getData(url).done(result => {
        Object.keys(result.drinks).forEach(function (key) {
            quizDrinkRecommendation.push(result.drinks[key]);
        });
        let savedDrinks = JSON.stringify(quizDrinkRecommendation);
        localStorage.setItem('savedDrinks', savedDrinks);

        if (quizComplete) {
            window.location.href = prepath + "resultspage.html";
        }
    });
}

/**
 * returns list of items
 */
function getIngredients() {
    let url = buildUrl("ingredients");
    getData(url).done(result => {
        renderDrinkInfo(result);
    });
}

/**
 * returns list of items
 */
function getGlassTypes() {
    let url = buildUrl("glass");
    getData(url).done(result => {
        console.log(result);
        renderDrinkInfo(result);
    });
}

/**
 * returns list of items
 */
function getCategories(q) {
    let url = buildUrl("categories");
    getData(url).done(result => {
        renderDrinkInfo(result);
    });
}

/**
 * returns non-alcoholic drinks
 */
function getNonAlcoholic() {
    let url = buildUrl("filter") + "a=Non-Alcoholic";
    getData(url).then(result => {
        renderDrinkInfo(result);
    });
}

/**
 * concats strings together to form url + endpoint
 * @param {string} api 
 * @returns {string} url
 */
function buildUrl(api) {
    return apiHost + endpoints[api] || null;
}

/**
 * get data from api
 * @returns Promise object
 */
function getData(url) {
    return $.ajax({
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-rapidapi-host", "the-cocktail-db.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", cocktailKey);
        }
    })
}

function renderDrinkInfo(data) {
    // idDrink
    // strAlcoholic
    var resultsImage = data.drinks[0].strDrinkThumb
    let tct = $("#resultsImage");
    tct.attr("src", resultsImage);
    tct.attr("style", "height:400px !important;");

}

function renderIngredients(data) {
    var ingredients = data.drinks[0]
    console.log(ingredients)

}
// THESE WORK! -- TODO: event handlers
// getIngredients();
// getFilterBy('Vodka');
// getFilterBy('Whiskey');
// getFilterBy('Rum');
// getFilterBy('Gin');

// weather api stuff WIP
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=c36ac4ee2ac54475c59bef266d011a17&';

function getByLatLon(searchQuery) {
    $.get(`${API_URL}${searchQuery}`)
        .done(data => {
            userTemp = (((data.main.temp - 273.15) * 1.80 + 32)).toFixed(0);
            seasonDrinks();
        });
}

function geo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (loc) {
            searchTerm = `lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`;
            getByLatLon(searchTerm);
        }, function () {
            $('.checkAge-wrapper').remove();
            $('.black-trans-bkg').remove();
        });
    } else {
        $('.checkAge-wrapper').remove();
        $('.black-trans-bkg').remove();
    }

}



function navQuiz() {
    window.location.href = prepath + 'quiz.html';
}

function navRandom() {
    window.location.href = prepath + 'resultspage.html';
}


function seasonDrinks() {
    //if temperature is value<50 then return hot drink else return a cold drink
    if (userTemp <= 45) {
        getById(13971);
        $("#p-text").text("Based on the weather today, this is the best drink for you!");
        var displayUserTemp = $("<p>");
        $("#p-text").append(displayUserTemp);
        displayUserTemp.text("Current Temp: " + userTemp + "F");
        $(".validateBtn1").addClass("hide");
        $(".validateBtn2").addClass("hide");


    } else {
        getById(12890);
        $("#p-text").text("Based on the weather today, this is the best drink for you!");
        var displayUserTemp = $("<p>");
        $("#p-text").append(displayUserTemp);
        displayUserTemp.text("Current Temp: " + userTemp + "F");
        $(".validateBtn1").addClass("hide");
        $(".validateBtn2").addClass("hide");
    }
}


// js code for homepage (rafay)

$(".validateBtn1").on("click", function () {
    let userOfAge = true;
    localStorage.setItem('userOfAge', userOfAge);
    geo();
});

$(".validateBtn2").on("click", function () {
    window.location.href = 'https://babysharklive.com/';
});

$(document).on("click", ".closeBtn", function () {
    $(".black-trans-bkg").addClass("hide");
    $(".checkAge-wrapper").addClass("hide");
})
