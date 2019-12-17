
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
            console.log(result);
        });
    }

    /**
     * returns list of items
     */
    function getIngredients() {
        let url = buildUrl("ingredients");
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    /**
     * returns list of items
     */
    function getGlassTypes() {
        let url = buildUrl("glass");
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    /**
     * returns list of items
     */
    function getCategories(q) {
        let url = buildUrl("categories");
        getData(url).done(result => {
            console.log(result);
            renderDrinkInfo(JSON.stringify(result));
        });
    }

    /**
     * returns non-alcoholic drinks
     */
    function getNonAlcoholic() {
        let url = buildUrl("filter") + "a=Non-Alcoholic";
        getData(url).then(result => {
            console.log(reuslt);
            renderDrinkInfo(JSON.stringify(result));
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
        console.log(resultsImage)
    }

    function renderIngredients(data) {
        var ingredients = data.drinks[0]
        console.log(ingredients)
        
    }

    $(".likeIcon").on("click", function(){
        getRandom()
    });

    $(".dislikeIcon").on("click", function(){
        getRandom()
    });


    // getNonAlcoholic();
    getRandom();
    

    // THESE WORK! -- TODO: event handlers
    // getIngredients();
    // getFilterBy('Vodka');
    // getFilterBy('Whiskey');
    // getFilterBy('Rum');
    // getFilterBy('Gin');

    
