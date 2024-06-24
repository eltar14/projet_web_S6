// Enable hidden nav bar
{
    const nav = document.querySelector(".nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (lastScrollY < window.scrollY) {
            nav.classList.add("nav--hidden");
            document.getElementById("myForm").style.display = "none";
        } else {
            nav.classList.remove("nav--hidden");
        }

        lastScrollY = window.scrollY;
    });
}


function openForm() {
    if (document.getElementById("myForm").style.display === "block"){
        document.getElementById("myForm").style.display = "none";
    }else{
        document.getElementById("myForm").style.display = "block";
    }

}

function closeForm() {
document.getElementById("myForm").style.display = "none";
}

