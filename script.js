// Добавьте этот код в начало вашего script.js
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

if (isMobileDevice()) {
    document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; color: white; font-family: Arial; text-align: center; padding: 20px;">
            <div>
                <h1>🚫 Доступ ограничен</h1>
                <p>Этот сайт недоступен для просмотра с мобильных устройств.</p>
                <p>Пожалуйста, откройте его на компьютере.</p>
            </div>
        </div>
    `;
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    throw new Error("Mobile access restricted");
}

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

