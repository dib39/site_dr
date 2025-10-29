document.addEventListener("DOMContentLoaded", () => {
  const hole = document.getElementById("hole");
  const forest = document.querySelector(".forest");

  hole.addEventListener("click", () => {
    // создаём слой затемнения
    const overlay = document.createElement("div");
    overlay.classList.add("fall-overlay");
    document.body.appendChild(overlay);

    // включаем плавное затемнение
    setTimeout(() => overlay.classList.add("active"), 200);

    // плавное приближение прямо в центр (дырку)
    forest.style.transition = "transform 2s ease-in, filter 2s ease-in";
    forest.style.transformOrigin = "center center";
    forest.style.transform = "scale(4)";
    forest.style.filter = "brightness(0)";

    // переход на следующую страницу
    setTimeout(() => {
      window.location.href = "next.html";
    }, 3000);
  });
});
