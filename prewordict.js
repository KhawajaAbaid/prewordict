if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready(){
    document.getElementsByClassName("user-predict-button")[0].addEventListener('click',
    predictButtonClicked)
}

var cloud_num = 2;
function predictButtonClicked(){
    console.log("predict button clicked")

    // get the image element and its parent to remove that image
    // element to replace it with a result image
    imageElem = document.getElementsByClassName("cloud-image")[0]
    img_parent = imageElem.parentElement
    img_parent.removeChild(imageElem)
    
    //add a result image depending on the prediction
    img_parent.innerHTML = `
    <div class='result-image'>
        <div>
            <img src="images/peepoCheer.png" width=200px>
        </div>
    </div>`
    parent_section = img_parent.parentElement.parentElement;
    h2_heading = parent_section.getElementsByTagName("h2")[0];
    h2_heading.innerHTML = "Congratulations! You are a pre-wordict!";

    // remove the input box and predict button and add two new buttons
    input_bar = document.getElementsByClassName("user-input-box")[0]
    predictButton = document.getElementsByClassName("user-predict-button")[0]
    parent_div_of_user_input = input_bar.parentElement;
    parent_div_of_user_input.removeChild(input_bar);
    parent_div_of_user_input.removeChild(predictButton);
    parent_div_of_user_input.innerHTML = `
        <button class="user-next-cloud-button button">Next Cloud!</button>
        <button class="user-try-again-button button">Let me try again!</button>`;
    
    // add event listeners to the buttons
    parent_div_of_user_input.getElementsByClassName("user-next-cloud-button")[0].addEventListener('click', nextCloudButtonClicked);
    parent_div_of_user_input.getElementsByClassName("user-try-again-button")[0].addEventListener('click', tryAgainButtonClicked);
}

function nextCloudButtonClicked(){
    console.log("next cloud button clicked")
    game_section = document.getElementsByClassName("game-section")[0]
    h2_heading = game_section.getElementsByTagName("h2")[0];
    game_section_image = game_section.getElementsByTagName("img")[0];
    parent_div_of_img = game_section_image.parentElement;
    game_section.removeChild(h2_heading);
    parent_div_of_img.removeChild(game_section_image);
    game_section.innerHTML = `
        <h2 class="lets-predict-title">Let's Predict!</h2>
        <div>
            <div class="actual-play-area">
                <img class="cloud-image" src="clouds_and_words/cluster_${cloud_num}_cloud.png">
            </div>
        </div>
    `;
    user_input_section = document.getElementsByClassName("user-input-section")[0];
    user_input_section.removeChild(user_input_section.getElementsByTagName("div")[0]);
    user_input_section.innerHTML = `
            <div>
                <input class="user-input-box" type="text" placeholder="Your Prediction">
                <button class="user-predict-button button">Predict!</button>
            </div>
    `
    user_input_section.getElementsByClassName("user-predict-button")[0].addEventListener('click', predictButtonClicked);
    cloud_num += 1;
}

function tryAgainButtonClicked(){
    console.log("try again button clicked")
}