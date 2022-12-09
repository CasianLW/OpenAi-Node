const { generateImage } = require("../controllers/openaiController");

function onSubmit(e) {
  e.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (prompt === "") {
    alert("Ajoutez du texte dans le formulaire !");
    return;
  }
  //   test
  //   console.log(prompt, size);
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    const response = await fetch("/openai/generateimage", {
      method: POST,
      headers: {
        "Content-Type": "application/jsonn",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error("L'image n'a pas pu être génerée");
    }
    const data = await response.json();
  } catch (error) {}
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
document.querySelector("#image-form").addEventListener("submit", onSubmit);
