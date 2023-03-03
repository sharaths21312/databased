document.querySelector("#nav-hamburger").addEventListener("click", function () {
    if (document.querySelector("#nav-hamburger").getAttribute("data-state") == "inactive") {
        openMenu();
    }
    else {
        closeMenu();
    }
});

document.querySelectorAll("#mobileMenu a").forEach(function (e) {
    e.addEventListener("click", function () {
        closeMenu();
    });
});

function closeMenu() {
    document.querySelector("#nav-hamburger").setAttribute("data-state", "inactive");
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
    var percent = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    document.querySelector("body").style.background = `linear-gradient(
      #180834 0,
      #26032c calc(100vh + 0px),
      rgb(${16 + percent * (15 - 16)}, ${16 + percent * (84 - 16)}, ${16 + percent * (138 - 16)}) 100vh
    )`;
}

window.addEventListener("scroll", function () {
    setBgColor();
});
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
  