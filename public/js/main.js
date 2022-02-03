const myText = document.getElementById("floatingTextarea");

myText.style.cssText = `height: ${myText.scrollHeight}px; overflow-y: hidden`;

myText.addEventListener("input", function() {
  this.style.height = "8rem";
  this.style.height = `${this.scrollHeight}px`;
});

