function unload() {
  document.querySelector("#loader").classList.add("fadeout");
  setTimeout(() => {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#loader").classList.remove("fadeout");
  }, 300);
}

document.querySelector("#nav-hamburger").addEventListener("click", function () {
  if (
    document.querySelector("#nav-hamburger").getAttribute("data-state") ==
    "inactive"
  ) {
    openMenu();
  } else {
    closeMenu();
  }
});

document.querySelectorAll("#mobileMenu a").forEach(function (e) {
  e.addEventListener("click", function () {
    closeMenu();
  });
});

function closeMenu() {
  document
    .querySelector("#nav-hamburger")
    .setAttribute("data-state", "inactive");
  document.querySelector("#mobileMenu").classList.add("fadeout");
  setTimeout(() => {
    document.querySelector("#mobileMenu").style.display = "none";
    document.querySelector("#mobileMenu").classList.remove("fadeout");
  }, 300);
  document.querySelectorAll("#nav-hamburger span").forEach(function (e) {
    e.style.display = "block";
  });
  document.querySelector("#nav-hamburger p").style.display = "none";
}
function openMenu() {
  document.querySelector("#nav-hamburger").setAttribute("data-state", "active");
  document.querySelector("#mobileMenu").style.display = "block";
  document.querySelectorAll("#nav-hamburger span").forEach(function (e) {
    e.style.display = "none";
  });
  document.querySelector("#nav-hamburger p").style.display = "block";
}

function setBgColor() {
  var percent =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  document.querySelector("body").style.background = `linear-gradient(
      #180834 0,
      #26032c calc(100vh + 0px),
      rgb(${16 + percent * (15 - 16)}, ${16 + percent * (84 - 16)}, ${
    16 + percent * (138 - 16)
  }) 100vh
    )`;
}

window.addEventListener("scroll", function () {
  setBgColor();
});
