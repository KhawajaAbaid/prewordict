if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready();
}

function ready(){
    document.getElementsByClassName("user-predict-button")[0].addEventListener('click',
    predictButtonClicked)
}

var cloud_num = 1;
async function predictButtonClicked(){
    // console.log("predict button clicked");
    var prediction = document.getElementsByClassName("user-input-box")[0].value;
    var prediction_result = await isThePredictionCorrect(prediction);
    if(prediction_result==true){
        // console.log("win result found")
    }
    else{
        // console.log("lose result found")
    }
    displayResultScreen(prediction_result);
}


// dont ask me why this is here, but it is or why do i have so many functions
// that could be combined into one.
async function isThePredictionCorrect(prediction){
    var url = `clouds_and_words/cluster_${cloud_num}_words.csv`;
    var cluster_words = await getClusterWordsFR(url);
    // console.log(cluster_words.length);
    for(var i=0; i<100; i++){
        if(cluster_words[i].replace(/\s/g, '').toLowerCase()==prediction.replace(/\s/g, '').toLowerCase()){
            // console.log("is equal");
            return true;
            }
        }
    // console.log("nope!");
    return false;
}

// copied from https://uufishtxl.github.io/js_api_fetch_csv.html
async function getClusterWordsFR(url) {
    const response = await fetch(url);
    const data = await response.text();
    const clusterWords = data.split(/\n/).slice(1);
    return clusterWords;
}

// this function copied from stackoverflow and modified to fit our needs
// https://stackoverflow.com/questions/25046301/convert-url-to-file-or-blob-for-filereader-readasdataurl
// it takes an url, converts it to a blob, passes on to filereader which can only fucking
// read a blob and coverting a file to a blob is a fucking nightmare. I've wasted
// my past 4 hours on getting all this shit to work. Reading a csv file in javascript
// is like programming a nasa mars rover, perhaps that'd even be easier
// thank goodness i don't have to deal with this mess of a language often.
// long live python!

// never fucking mind, the function below doesn't work
// it has way to many syncing issues, the http request runs
// either async or it doesnt work at all. So the program executes
// before any data is return. Plus it was more complicated.
// but thank goodness i finally found a better and way more
// concise method i.e. the getClusterWordsFR function above

// function getTheClusterWords(url){
//     console.log("getting the cluster words..");
//     var request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.responseType = 'blob';
//     console.log("rquest onlondingd")
//     // how to pause the program until the function below executes
//     request.onload = function() {
//         var reader = new FileReader();
//         reader.readAsText(request.response);
//         reader.onload =  function (event) {
//             const text = event.target.result; // the CSV content as string
//             console.log("making the call to csvToArray")
//             var data = csvToArray(text);
//             // console.log(typeof(data)); //spoiler: it's of type array
//             console.log("getTheClusterWords Sample: " + data[0]);
//             }
//         console.log("return reader result");
//         // return reader.result;
//     };
//     console.log("senddd diittt");
//     request.send();
// }

// no need for it either the getClusterWordsFR function above does everything
// converts the csv file to an array 

// function csvToArray(str, delimiter = ",") {
//     // slice from start of text to the first \n index
//     // use split to create an array from string by delimiter
//     const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
//     // slice from \n index + 1 to the end of the text
//     // use split to create an array of each csv value row
//     var rows = str.slice(str.indexOf("\n") + 1).split("\n");
//     // console.log(headers)
//     console.log("csvToArray return rows")
//     console.log("csvToArray sample: " + rows[0])
//     return rows;
// }

function displayResultScreen(prediction_result){
        // get the image element and its parent to remove that image
    // element to replace it with a result image
    var imageElem = document.getElementsByClassName("cloud-image")[0]
    var img_parent = imageElem.parentElement
    img_parent.removeChild(imageElem)
    
    var won_image_path = "images/PeepoCheer.png";
    var lost_image_path = "images/sadge.png";

    var won_h1 = "Congratulations!";
    var won_h2 = "Your prediction is correct!";

    var lost_h1 = "Aw, Snap!";
    var lost_h2 = "Your prediction is incorrect!";

    //add a result image depending on the prediction
    img_parent.innerHTML = `
    <div class='result-image'>
        <div>
            <img src="${prediction_result ? won_image_path : lost_image_path}" width=200px>
        </div>
    </div>`;
    var headings_parent = document.getElementsByClassName("lets-predict-title")[0].parentElement
    headings_parent.innerHTML = `
        <h1 class="${prediction_result? 'won_h1' : 'lost_h1'}">${prediction_result ? won_h1 : lost_h1}</h1>
        <h2 class="${prediction_result? 'won_h2' : 'lost_h2'}">${prediction_result ? won_h2 : lost_h2}</h2>
    `

    // remove the input box and predict button and add two new buttons
    var input_bar = document.getElementsByClassName("user-input-box")[0]
    var predictButton = document.getElementsByClassName("user-predict-button")[0]
    var parent_div_of_user_input = input_bar.parentElement;
    parent_div_of_user_input.removeChild(input_bar);
    parent_div_of_user_input.removeChild(predictButton);
    parent_div_of_user_input.innerHTML = `
        <button class="user-next-cloud-button button">Next Cloud!</button>
        <button class="user-try-again-button button">Let me try again!</button>`;
    
    // add event listeners to the buttons
    parent_div_of_user_input.getElementsByClassName("user-next-cloud-button")[0].addEventListener('click', nextCloudButtonClicked);
    parent_div_of_user_input.getElementsByClassName("user-try-again-button")[0].addEventListener('click', tryAgainButtonClicked);
}

function resetScreen(){
    // removes result contents and replaces with original
    // check the index.html for more info
    var game_section = document.getElementsByClassName("game-section")[0]
    var parent_div_of_headings = game_section.getElementsByTagName("div")[0];
    var parent_div_of_img = game_section.getElementsByTagName("div")[1];
    game_section.removeChild(parent_div_of_headings);
    game_section.removeChild(parent_div_of_img);
    game_section.innerHTML = `
        <div>
            <h2 class="lets-predict-title">Let's Predict!</h2>
        </div>
        <div>
            <div class="actual-play-area">
                <img class="cloud-image" src="clouds_and_words/cluster_${cloud_num}_cloud.png">
            </div>
        </div>
    `;
    var user_input_section = document.getElementsByClassName("user-input-section")[0];
    user_input_section.removeChild(user_input_section.getElementsByTagName("div")[0]);
    user_input_section.innerHTML = `
            <div>
                <input class="user-input-box" type="text" placeholder="Your Prediction">
                <button class="user-predict-button button">Predict!</button>
            </div>
    `
    user_input_section.getElementsByClassName("user-predict-button")[0].addEventListener('click', predictButtonClicked);

}

function nextCloudButtonClicked(){
    // the difference between this function and tryAgainButtonClicked is that
    // this increments the cloud_num variable that is used to get the next
    // cloud image and the csv file that contains the words for that cloud
    // and the tryAgainButtonClicked function only resets the screen
    // btw the upper three comment lines were written by github copilot.
    // **Pets the Github Copilot** 'good boy'
    // console.log("next cloud button clicked")
    cloud_num += 1;
    resetScreen();
    if (cloud_num>29){
        cueTheEnd();
    }
}

function tryAgainButtonClicked(){
    // console.log("try again button clicked");
    resetScreen();
}

function cueTheEnd(){
         // get the image element and its parent to remove that image
    // element to replace it with a result image
    var imageElem = document.getElementsByClassName("cloud-image")[0]
    var img_parent = imageElem.parentElement
    img_parent.removeChild(imageElem)
    
    var theEnd_image_path = "images/spongebob_theEnd.jpg";

    var theEnd_h1 = "Ayyy Congratulations!";
    var theEnd_h2 = "You've finished the game! Thank you so much for playing it to the end!";

    //add a result image depending on the prediction
    img_parent.innerHTML = `
    <div class='result-image'>
        <div>
            <img class='the-end-image' src="${theEnd_image_path}" width=400px>
        </div>
    </div>`;
    var headings_parent = document.getElementsByClassName("lets-predict-title")[0].parentElement
    headings_parent.innerHTML = `
        <h1 class="won_h1">${theEnd_h1}</h1>
        <h2 class="won_h2">${theEnd_h2}</h2>
    `

    // remove the input box and predict button and add two new buttons
    var input_bar = document.getElementsByClassName("user-input-box")[0]
    var predictButton = document.getElementsByClassName("user-predict-button")[0]
    var parent_div_of_user_input = input_bar.parentElement;
    parent_div_of_user_input.removeChild(input_bar);
    parent_div_of_user_input.removeChild(predictButton);
    parent_div_of_user_input.innerHTML = `
        <button class="user-next-cloud-button button the-end-button">Play again from start!</button>
        <button class="user-try-again-button button the-end-button">Try the last cloud again!</button>`;
    
    // add event listeners to the buttons
    parent_div_of_user_input.getElementsByClassName("user-next-cloud-button")[0].addEventListener('click', nextCloudButtonClicked);
    parent_div_of_user_input.getElementsByClassName("user-try-again-button")[0].addEventListener('click', tryAgainButtonClicked);
}