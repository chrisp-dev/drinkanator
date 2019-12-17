//store list of drink IDs in this array to display drinks in the results page
var quizDrinkRecommendation = []

// creating an array of questions to display dynamically
var quizQuestions = [{
        title: "WHICH SEASON DO YOU THRIVE IN?",
        choices: ["Summer", "Fall", "Winter", "Spring"],
        img: ["assets/images/summer2.jpg", "assets/images/fall2.jpg", "assets/images/winter2.jpg", "assets/images/spring2.jpg"]
    },
    {
        title: "WHAT TYPE OF MOVIES DO YOU ENJOY?",
        choices: ["Romantic", "Comedy", "Action", "Horror"],
        img: ["https://cdn.stocksnap.io/img-thumbs/960w/CNO1FTRUAP.jpg", "https://www.system-concepts.com/wp-content/uploads/2018/04/iStock-908333824-cool-granny1-1000px.jpg", "https://miro.medium.com/max/1180/0*7F-QqYhSJLC59U4w.", "https://images.alphacoders.com/787/thumb-350-787294.png"]
    }
]

//array of variables for movie types
var romanticIng = ["egg white", "cream", "milk", "Creme de Cassis", "Chocolate", "Coffee", "espresso", "ameretto", "tea", "kahlua", "red wine", "cocoa", "lavendar", "rose"]

var comedyIng = ["lemon", "Lime", "apple", "orange", "strawberry", "grapefruit", "pineapple", "mango", "berries", "grape", "peach", "cantaloupe"]

var actionIng = ["soda", "tonic water", "cola", "sprite", "club soda", "ginger beer", "ginger ale", "vermouth", "olive"]

var horrorIng = ["soda", "tonic water", "cola", "sprite", "club soda", "ginger beer", "ginger ale"]

// user's selection from the quiz
var userChoice = []

// user's selected ingredient variable
var userIng;

//array of spirit
var summerSpirits = ["tequila", "rum"]

var fallSpirits = ["whiskey", "brandy"]

var winterSpirits = ["whiskey", "brandy"]

var springsSpirits = ["gin", "vodka"]

//counter for the index
var counter = 0;

//function to generate quiz questions
function renderQuestion() {
    if (counter >= quizQuestions.length) {
        $(".quizcontainer").css("display", "none")
        $("#QuizQuestion").text("SELECT AN INGREDIENT")
        displayIngredients();
        // console.log(userChoice)
    } else {
        $("#QuizQuestion").text(quizQuestions[counter].title)
        var options = $(".ans");
        var image = $("img")
        // console.log(options[0].textContent);
        for (var i = 0; i < quizQuestions[counter].choices.length; ++i) {
            options[i].textContent = (quizQuestions[counter].choices[i]);
            image[i].setAttribute("src", quizQuestions[counter].img[i]);
        }
    }
}

//render first set of questions
renderQuestion()

//when user selects an option render next question and grab the text value
$(".next").on("click", function () {
    counter++;
    // console.log($(this).find("p"));
    var text = $(this).find("p").text();
    // console.log(text);
    userChoice.push(text)
    // console.log(userChoice)
    renderQuestion()
})


//display modal with ingredients
function displayIngredients() {
    // console.log(userChoice)
    var ingContainer = $("<div>")
    ingContainer.attr("class", "ingContainer")
    $("body").append(ingContainer)

    //if statement to render the correct array
    if (userChoice[1] === "Romantic") {
        // console.log(romanticIng)
        for (var i = 0; i < romanticIng.length; ++i) {
            var listBtn = $("<button>")
            listBtn.attr("class", "listBtn")
            $(".ingContainer").append(listBtn)
            listBtn.text(romanticIng[i])
        }
    }

    if (userChoice[1] === "Comedy") {
        for (var i = 0; i < comedyIng.length; ++i) {
            var listBtn = $("<button>")
            listBtn.attr("class", "listBtn")
            $(".ingContainer").append(listBtn)
            listBtn.text(comedyIng[i])
        }
    }

    if (userChoice[1] === "Action") {
        for (var i = 0; i < actionIng.length; ++i) {
            var listBtn = $("<button>")
            listBtn.attr("class", "listBtn")
            $(".ingContainer").append(listBtn)
            listBtn.text(actionIng[i])
        }
    }

    if (userChoice[1] === "Horror") {
        for (var i = 0; i < horrorIng.length; ++i) {
            var listBtn = $("<button>")
            listBtn.attr("class", "listBtn")
            $(".ingContainer").append(listBtn)
            listBtn.text(horrorIng[i])
        }
    }
}

//click event to grab the value the user selects when they see ingredients
$(document).on("click", "button", function () {
    userIng = $(this).text();
    // console.log(userIng);
    getFilterByQuiz(userIng);
    returnListDrinks();
    console.log("display quizDrinkRecommendation array")
    console.log(quizDrinkRecommendation)
})

//function to return list the correct list of spriits by seasons
function returnListDrinks() {
    if (userChoice[0] === "Summer") {
        getFilterByQuiz('Tequila');
        getFilterByQuiz('Rum');
    } else if (userChoice[0] === "Fall") {
        getFilterByQuiz('Whiskey');
        getFilterByQuiz('Brandy');
    } else if (userChoice[0] === "Winter") {
        getFilterByQuiz('Whiskey');
        getFilterByQuiz('Brandy');
    } else if (userChoice[0] === "Spring") {
        getFilterByQuiz('Gin');
        getFilterByQuiz('Vodka');
    }
}



// getFilterBy('whiskey');
// getFilterBy('Rum');
// getFilterBy('Gin');
// getFilterBy('lemon');
// getNonAlcoholic();
// getRandom();
// getIngredients();
// THESE WORK! -- TODO: event handlers
// getIngredients();