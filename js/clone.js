document.addEventListener("DOMContentLoaded", function () {
    var card = document.querySelector(".card");
    var cardText = document.querySelector(".card-text");

    document.getElementById("top").addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        var xAxis = (event.clientX - rect.left - rect.width / 2) / 15;
        var yAxis = (event.clientY - rect.top - rect.height / 2) / 15;
        
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        card.style.transition = "transform 0.1s ease-out";
        
        // Enhance text perspective effect
        if (cardText) {
            cardText.style.transform = `translateZ(50px)`;
        }
    });

    document.getElementById("top").addEventListener("mouseleave", function () {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
        card.style.transition = "transform 0.5s ease-out";
        
        if (cardText) {
            cardText.style.transform = "translateZ(0px)";
        }
    });
});
