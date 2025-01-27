// Also learned how to build webpages with Javascript during this project

console.log("app.js linked successfully!");

// Buttons

const xycomps = document.getElementById("xycomps");
const magnitude = document.getElementById("magnitude");
const addVectors = document.getElementById("add-vectors");
const futureTopics = document.getElementById("future-topics");

// Input areas

const inputDefaultText = document.getElementById("default-text");
const inputXYComps = document.getElementById("xycomps-input");
const inputMagnitude = document.getElementById("magnitude-input");
const inputAddVectors = document.getElementById("add-vectors-input");
const inputFutureTopics = document.getElementById("future-topics-input");

function hideAllTasks() {
    inputDefaultText.classList.add("hidden");
    inputXYComps.classList.add("hidden");
    inputMagnitude.classList.add("hidden");
    inputAddVectors.classList.add("hidden");
    inputFutureTopics.classList.add("hidden");
}