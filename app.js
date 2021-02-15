// Adding event listeners
slides.forEach((slide, index) => {
	const slideImage = slide.querySelector("img");
	slideImage.addEventListener("dragstart", e => e.preventDefault()); // disable default image drag

	//Touch Events
	slide.addEventListener("touchstart", draggingStart(index));
	slide.addEventListener("touchend", draggingEnd);
	slide.addEventListener("touchmove", movingSlide);
	// mouse events
	slide.addEventListener("mousedown", draggingStart(index));
	slide.addEventListener("mouseup", draggingEnd);
	slide.addEventListener("mousemove", movingSlide);
	slide.addEventListener("mouseleave", draggingEnd);
});

window.oncontextmenu = e => {
	// prevents right click to open context menu
	e.preventDefault();
	e.stopPropagation();
	return false;
};
