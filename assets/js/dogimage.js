const images = [
  "../images/public/1.png",
  "../images/public/2.png",
  "../images/public/3.png",
  "../images/public/4.png",
  "../images/public/5.png",
  "../images/public/6.png",
  "../images/public/7.png",
  "../images/public/8.png",
  "../images/public/9.png",
  "../images/public/10.png",
  "../images/public/11.png",
  "../images/public/12.png",
  "../images/public/13.png",
  "../images/public/14.png",
  "../images/public/15.png",
];

const imageDiv = document.getElementsByClassName("dog-image");
const img = document.getElementById("randomImage");

imageDiv.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  img.src = images[randomIndex];
});
