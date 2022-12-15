// const { generateImage } = require("./controllers/openaiController");

function onSubmit(e) {
  e.preventDefault();
  console.log("test");
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
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      console.log(prompt, size);
      console.log(await response.json());
      throw new Error("L'image n'a pas pu être génerée");
    }
    const data = await response.json();

    removeSpinner();
    // console.log(data);
    // const imageUrl = data.data;
    const imageUrl1 = data.data1;
    const imageUrl2 = data.data2;
    const imageUrl3 = data.data3;
    const imageUrl4 = data.data4;
    // console.log(imageUrl1);
    console.log(await data);
    document.querySelector("#image1").src = imageUrl1;
    // document.querySelector("#image1").src = imageUrl1;
    document.querySelector("#image2").src = imageUrl2;
    document.querySelector("#image3").src = imageUrl3;
    document.querySelector("#image4").src = imageUrl4;
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
document.querySelector("#image-form").addEventListener("submit", onSubmit);
