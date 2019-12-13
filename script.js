$(document).ready(function () {

    // variables
    // https://rapidapi.com/developer/security/Drinkanator
    const cocktailKey = 'f5fa4c0484mshad6cb57c6f05a3fp195dcejsn6e3f9016299c'
    const cocktailApiUrl = "https://the-cocktail-db.p.rapidapi.com/random.php?apiid=" + cocktailKey;
    const drizlyApiUrl = '';

    /**
     * get data from api
     */
    function getData(apiUrl, queryString) {
        let dataUrl = apiUrl + "q=" + queryString;

        $.ajax({
            url: dataUrl,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-rapidapi-host", "the-cocktail-db.p.rapidapi.com");
                xhr.setRequestHeader("x-rapidapi-key", cocktailKey);
            }
        }).done(result => {
            console.log(result);
        });
    }

    function renderDrinkInfo(data) {
        // idDrink
        // strAlcoholic
    }

    // TODO: move this to an event handler
    getData(cocktailApiUrl, 'vodka');
});