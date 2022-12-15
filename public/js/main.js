// const { generateImage } = require("./controllers/openaiController");

// document.onkeypress = function (e) {
//   e = e || window.event;
//   // use e.keyCode
//   const btnSub = document.querySelector(".btn");

//   document.querySelector("#prompt").value == ""
//     ? // ? (btnSub.style.background = `linear-gradient(
//       //   97deg,
//       //   rgb(144, 144, 144) 0%,
//       //   rgb(84, 84, 84) 43%,
//       //   rgb(118, 118, 118) 92%
//       // )`)
//       // : (btnSub.style.background = `linear-gradient(
//       //   97deg,
//       //   rgba(252, 194, 109, 1) 0%,
//       //   rgba(159, 109, 255, 1) 43%,
//       //   rgba(226, 119, 172, 1) 92%
//       // )`);
//       btnSub.classList.add("btn-active")
//     : btnSub.classList.add("btn-active");
// };

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
    removeImages();
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
    showImages();
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

function showImages() {
  document.querySelector(".img-ctnr").classList.add("show-images");
}
function removeImages() {
  document.querySelector(".img-ctnr").classList.remove("show-images");
}
