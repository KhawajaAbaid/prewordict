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

function predictButtonClicked(){
    console.log("predict button clicked")
    imageElem = document.getElementsByClassName("cloud-image")[0]
    img_parent = imageElem.parentElement
    img_parent.removeChild(imageElem)
    img_parent.innerHTML = `
    <div class='result-image'>
        <div>
            <img src="images/peepoCheer.png" width=200px>
        </div>
    </div>`
    parent_section = img_parent.parentElement.parentElement
    h2_heading = parent_section.getElementsByTagName("h2")[0]
    h2_heading.innerHTML = "Congratulations! You are a pre-wordict!"
}