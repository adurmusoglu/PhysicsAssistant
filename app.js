// Also learned how to build webpages with Javascript during this project

console.log("app.js linked successfully!");
let vectorCounter = 1; // Keeps count of how many vectors are currently being added

// The selections from the calculations menu

const xyComps = document.getElementById("xycomps");
const magnitude = document.getElementById("magnitude");
const addVectors = document.getElementById("add-vectors");
const futureTopics = document.getElementById("future-topics");

// The submit buttons for the inputs

const submitXYComps = document.getElementById("xycomps-input-submit");
const submitMagnAngle = document.getElementById("magnitude-input-submit");
const submitCreateVectorInput = document.getElementById("create-a-vector");
const submitAddVectors = document.getElementById("add-vectors-input-submit");

// Input areas

const inputDefaultText = document.getElementById("default-text");
const inputXYComps = document.getElementById("xycomps-input");
const inputMagnitude = document.getElementById("magnitude-input");
const inputAddVectors = document.getElementById("add-vectors-input");
const inputFutureTopics = document.getElementById("future-topics-input");

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
    createVectorInput();
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
    const xComp = document.getElementById("magn-xcomp-input").value;
    const yComp = document.getElementById("magn-ycomp-input").value;
    let angle = calculateAngle(xComp, yComp);
    let magnitude = Math.sqrt(Math.pow(xComp, 2) + Math.pow(yComp, 2));
    console.log(`The magnitude of the vector is ${magnitude} and the angle is ${angle}`);
});

submitCreateVectorInput.addEventListener("click", () => {
    createVectorInput();
});

// NEED A REMOVE VECTOR INPUT AS WELL.
// ALSO NEED TO SET UP THE RESET OF THE INPUT BOXES WHEN SWITCHED OFF CURRENT MENU OPTION. HOW? GOD KNOWS.

submitAddVectors.addEventListener("click", () => {
    const totalXComp = calcXComp();
    const totalYComp = calcYComp();

    const magnitude = Math.sqrt(Math.pow(totalXComp, 2) + Math.pow(totalYComp, 2));
    const angle = calculateAngle(totalXComp, totalYComp);

    console.log("The angle is: " + angle + " & the magnitude is: " + magnitude);
});

// hideAllInputs serves as a reset for when the user chooses to calculate something
// else by hiding all current input divs

function hideAllInputs() 
{
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

function createVectorInput() 
{
    const currentVector = "vector" + vectorCounter;
    let vectorsContainer = document.getElementById("vectors-container");
    let newDiv = document.createElement("div");
    vectorsContainer.appendChild(newDiv);
    newDiv.id = currentVector + "-container";

    // Creates magnitude input for vector n

    let magnitudeInputLabel = document.createElement("label");
    magnitudeInputLabel.htmlFor = currentVector+"-magnitude-input";
    magnitudeInputLabel.textContent = "Enter the magnitude: ";

    let newMagnitudeInput = document.createElement("input");
    newMagnitudeInput.name = currentVector + "-magnitude-input";
    newMagnitudeInput.id = currentVector + "-magnitude-input";
    newMagnitudeInput.type = "number";

    // Creates angle input and its label for vector n
    
    let angleInputLabel = document.createElement("label");
    angleInputLabel.htmlFor = currentVector+"-angle-input";
    angleInputLabel.textContent = "Enter the angle from x+ axis (in degrees): ";

    let newAngleInput = document.createElement("input");
    newAngleInput.name = currentVector + "-angle-input";
    newAngleInput.id = currentVector + "-angle-input";
    newAngleInput.type = "number";
    
    // Nest the labels and inputs into the newDiv

    newDiv.append(magnitudeInputLabel);
    newDiv.append(newMagnitudeInput);
    newDiv.append(angleInputLabel);
    newDiv.append(newAngleInput)

    vectorCounter++;

    console.log(currentVector + " was added to vectors input!");
}

function calcXComp() 
{
    let totalXComp = 0;
    
    for (let i = 1; i < vectorCounter; i++)
    {   
        const currentVector = "vector" + i;
        const magnitude = document.getElementById(currentVector + "-magnitude-input").value;
        const angle = document.getElementById(currentVector + "-angle-input").value;
        const tempXComp = Math.cos(angle) * magnitude;
        totalXComp += tempXComp;
    }

    return totalXComp;
}

function calcYComp()
{
    let totalYComp = 0;
    
    for (let i = 1; i < vectorCounter; i++)
    {   
        const currentVector = "vector" + i;
        const magnitude = document.getElementById(currentVector + "-magnitude-input").value;
        const angle = document.getElementById(currentVector + "-angle-input").value;
        const tempYComp = Math.sin(angle) * magnitude;
        totalYComp += tempYComp;
    }

    return totalYComp;
}