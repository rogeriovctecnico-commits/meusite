console.log("Script carregado");

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#image-container img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const indicators = document.querySelectorAll(".indicators span");

    let currentIndex = 0;
    const total = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
            indicators[i].classList.toggle("active", i === index);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + total) % total;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % total;
        showImage(currentIndex);
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => {
            currentIndex = i;
            showImage(currentIndex);
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % total;
        showImage(currentIndex);
    }, 5000);

    showImage(currentIndex);
});