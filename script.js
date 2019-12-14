$(document).ready(function () {

    // cocktail db stuff
    let alcoholicFilters = { strAlcoholic: ["Alcoholic", "Non alcoholic", "Optional alcohol", null] }

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

    function getById(api, id) {
        let url = buildUrl("lookup") + "i=" + id;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });;
    }

    function getRandom(q) {
        let url = buildUrl("random") + "q=" + q;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    function getFilterBy(q) {
        // a=Alcoholic a=non-Alcoholic
        // c=Cocktail c=Champagne_flute
        // i=Lime i=Rum
        let url = buildUrl("filter") + "i=" + q;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    function getIngredients(q) {
        let url = buildUrl("ingredients") + "i=" + q;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    function getGlassTypes(q) {
        let url = buildUrl("glass") + "c=" + q;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    function getCategories(q) {
        let url = buildUrl("categories") + "c=" + q;
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    function getNonAlcoholic() {
        let url = buildUrl("filter") + "a=Non-Alcoholic";
        getData(url).then(result => {
            console.log(reuslt);
            renderDrinkInfo(JSON.stringify(result));
        })
    }

    // === WIP === WORK IN PROGRESS === WIP ===
    // I thought maybe we would need a function to build our query
    function buildQ() {
        let filters = [];

        // get inputs from user?

        // stored alcohol preference?

        // favorite ingredients?

        // favorite glass type?

        // category?
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
        let txtNode = $("<p>");
        txtNode.text(data);
        $('body').prepend(txtNode);
    }

    // TODO: move this to an event handler
    getNonAlcoholic();
    getRandom();

    // THESE WORK! -- TODO: event handlers
    // getIngredients();
    // getFilterBy('Vodka');
    // getFilterBy('Whiskey');
    // getFilterBy('Rum');
    // getFilterBy('Gin');
});
