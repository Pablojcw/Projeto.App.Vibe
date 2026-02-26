const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();



const character = document.getElementById("character");

if (character) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollPercent = scrollTop / maxScroll;

    const screenWidth = window.innerWidth - character.offsetWidth;

    const moveX = scrollPercent * screenWidth;

    const bounce = Math.sin(scrollTop * 0.05) * 5;

    character.style.transform = `translate(${moveX}px, ${bounce}px)`;
  });
}