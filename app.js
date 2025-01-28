// Also learned how to build webpages with Javascript during this project

console.log("app.js linked successfully!");

// The selections from the calculations menu

const xyComps = document.getElementById("xycomps");
const magnitude = document.getElementById("magnitude");
const addVectors = document.getElementById("add-vectors");
const futureTopics = document.getElementById("future-topics");

// The submit buttons for the inputs
const submitXYComps = document.getElementById("xycomps-input-submit");
const submitMagnAngle = document.getElementById("magnitude-input-submit");

// Input areas

const inputDefaultText = document.getElementById("default-text");
const inputXYComps = document.getElementById("xycomps-input");
const inputMagnitude = document.getElementById("magnitude-input");
const inputAddVectors = document.getElementById("add-vectors-input");
const inputFutureTopics = document.getElementById("future-topics-input");

// hideAllInputs serves as a reset for when the user chooses to calculate something
// else by hiding all current input divs

function hideAllInputs() {
    inputDefaultText.classList.add("hidden");
    inputXYComps.classList.add("hidden");
    inputMagnitude.classList.add("hidden");
    inputAddVectors.classList.add("hidden");
    inputFutureTopics.classList.add("hidden");
}

// calculateAngle acconts for the quadrants and calculates accordingly
// to return the angle of the vector from x+ axis

function calculateAngle(xComp, yComp)
{
    let angle;

    if (xComp == 0 && yComp > 0) // Undefined special case that cmath errors out
    {
        angle = 90;
    }
    else if (xComp == 0 && yComp < 0) // Undefined special case that cmath errors out
    {
        angle = 270;
    }
    else if (xComp < 0) // Quadrants II and III
    {
        angle = (Math.atan(yComp / xComp) * (180 / Math.PI)) + 180;
    }
    else if (yComp < 0 && xComp >= 0) // Quadrants IV
    {
        angle = (Math.atan(yComp / xComp) * (180 / Math.PI)) + 360;
    }
    else // Quadrant I
    {
        angle = Math.atan(yComp / xComp) * (180 / Math.PI);
    }

    return angle;
}

// The event listeners in case of submit that displays the input table

xyComps.addEventListener("click", () => {
    hideAllInputs();
    inputXYComps.classList.remove("hidden");
});

magnitude.addEventListener("click", () => {
    hideAllInputs();
    inputMagnitude.classList.remove("hidden");
});

addVectors.addEventListener("click", () => {
    hideAllInputs();
    inputAddVectors.classList.remove("hidden");
});

futureTopics.addEventListener("click", () => {
    hideAllInputs();
    inputFutureTopics.classList.remove("hidden");
});

// Event listeners for when input is submitted

submitXYComps.addEventListener("click", () => {
    const magnitude = document.getElementById("xy-magn-input").value;
    const angle = document.getElementById("xy-angle-input").value;
    let outputXComp =  Math.cos(angle * (Math.PI / 180)) * magnitude;
    let outputYComp = Math.sin(angle * (Math.PI / 180)) * magnitude;
    console.log(`The X composition of the vector is ${outputXComp} and the Y composition of the vector is ${outputYComp}`);
});

submitMagnAngle.addEventListener("click", () => {
    const xComp = 1;
    const yComp = 1;
    let angle = calculateAngle(xComp, yComp);
    let magnitude = Math.sqrt(Math.pow(xComp, 2) + Math.pow(yComp, 2));
    console.log(`The magnitude of the vector is ${magnitude} and the angle is ${anlge}`);
});
