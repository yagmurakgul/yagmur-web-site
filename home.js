const characterButton = document.getElementById(
    "character-button"
);

const characterBubble = document.getElementById(
    "character-bubble"
);

if (characterButton && characterBubble) {
    function setBubbleOpen(isOpen) {
        characterBubble.hidden = !isOpen;

        characterButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }

    characterButton.addEventListener("click", () => {
        setBubbleOpen(characterBubble.hidden);
    });

    document.addEventListener("click", (event) => {
        const clickedCharacter =
            characterButton.contains(event.target);

        const clickedBubble =
            characterBubble.contains(event.target);

        if (!clickedCharacter && !clickedBubble) {
            setBubbleOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !characterBubble.hidden) {
            setBubbleOpen(false);
            characterButton.focus();
        }
    });
}