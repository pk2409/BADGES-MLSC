const widthIm = 1213;
const heightIm = 829;

var userName = "Name";
var team = "Team Name";
var code = "";
var cvs = document.getElementById("mycvs2");
var ctx = cvs.getContext("2d");

const linkedin = document.querySelector(".linkedin");
const twitter = document.querySelector(".twitter");
// const change = (e) => {
//     e.preventDefault();
//     console.log(e.target.value)
//     // const usname = document.getElementById("name").value;
// }

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.clear();
  userName = e.target[0].value;
  team = e.target[1].value;
  document.getElementById("down").style = "visibility: visible;";
  document.getElementById("share").style = "visibility: visible;";
//   document.querySelector(".qoute").style = "visibility: visible;";
  clear();
  draw();
//   throwConfetti();
  document.querySelector(".iframe").src = "";
  linkedin.disabled = true;
  twitter.disabled = true;
  document.querySelectorAll(".loading").forEach((loader) => {
    if (loader.classList.contains("stop-loading")) {
      loader.classList.remove("stop-loading");
    }
  });
});

const clear = () => {
  //ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
};

// Draw Function
const draw = () => {
  var img = document.getElementById("badgeImg");
  ctx.drawImage(img, cvs.width / 2 - (widthIm + 10) / 2, 0, widthIm, heightIm);
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // ctx.fillText(userName, cvs.width / 4 - 5, cvs.height - 205);
  // console.log(userName.length);
  ctx.fillText(
    userName,
    cvs.width / 2 - userName.length - 7.5,
    cvs.height - 300
  );
  ctx.font = "30px Arial";
  ctx.fillText(team, cvs.width / 2 - team.length - 9, cvs.height - 250);
};

window.onload = async function () {
  draw();
};

function download() {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement("a"),
    e;

  if (
    !(userName == "Name" || userName == "" || team == "Team Name" || team == "")
  ) {
    /// the key here is to set the download attribute of the a tag
    lnk.download = userName + ":" + team + ".png";

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = cvs.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.MouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );

      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
}

document.getElementById("down").addEventListener("click", (e) => {
  download();
});
console.log("it is working till here");

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}
//Confetti config
// const canvasTarget = document.getElementById("mycvs2");
// const throwConfetti = () => {
//   const confettiSettings = { target: canvasTarget, clock: 30, rotate: true };
//   const confetti = new ConfettiGenerator(confettiSettings);
//   confetti.render();
//   setTimeout(() => {
//     confetti.clear();
//   }, 3000);
// };

//Social Buttons

const shareBtn = document.querySelector(".share");

shareBtn.addEventListener("click", async () => {
  if (localStorage.getItem("imgUrl") == null) {
    fetch("https://api.cloudinary.com/v1_1/dhoayd4fv/image/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: cvs.toDataURL("image/png;base64"),
        upload_preset: "jnrod77e",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("imgUrl", result.url); //save image url to local storage
        document.querySelectorAll(".loading").forEach((loader) => {
          loader.classList.add("stop-loading");
        });
        document.querySelector(".iframe").src = localStorage.getItem("imgUrl");
        linkedin.disabled = false;
        twitter.disabled = false;
        // console.log("upload done");
      })
      .catch((e) => console.log(e));
  } else {
    document.querySelectorAll(".loading").forEach((loader) => {
      loader.classList.add("stop-loading");
    });
    document.querySelector(".iframe").src = localStorage.getItem("imgUrl");
    linkedin.disabled = false;
    twitter.disabled = false;
  }
});

linkedin.addEventListener("click", () => {
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${localStorage.getItem(
      "imgUrl"
    )}&title=Share%20Your%20Badge`
  );
});
twitter.addEventListener("click", () => {
  window.open(
    `https://twitter.com/intent/tweet?&url=https%3A%2F%2Fmake4thon.mlsctiet.co.in%2F&text=I%20got%20this%20supercool%20swish%20badge%2C%20to%20get%20yours%20participate%20in%20Makeathon%204.0.%0A&hashtags=mlsc%2Ctiet%2Cmake4thon%2Chashdeveloper%2Cdeveloper%2Chackathon%2Cwebdeveloper`
  );
});