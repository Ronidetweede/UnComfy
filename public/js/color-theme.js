const buttons = document.querySelectorAll(".theme-option");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let color;
    let lightColor;

    if (button.id === "green") {
      color = "var(--backgroundcolor-green)";
      lightColor = "#e8f9e3";
    } else if (button.id === "blue") {
      color = "var(--backgroundcolor-blue)";
      lightColor = "#eaf2ff";
    } else if (button.id === "pink") {
      color = "var(--backgroundcolor-pink)";
      lightColor = "#ffeaf4";
    } else if (button.id === "yellow") {
      color = "var(--backgroundcolor-yellow)";
      lightColor = "#fff9e6";
    }

    document.documentElement.style.setProperty("--theme-color", color);
    document.documentElement.style.setProperty("--theme-light", lightColor);

    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});