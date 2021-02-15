// Get the elements on which events will occur
const sliderContainer = document.querySelector(".slider-container"),
	slides = Array.from(document.querySelectorAll(".slide"));

// State of the Application (all positions our wrt to x-axis as it is horizontal-slider), currentIndex is index of slide which is being moved initially 0 as first 1st slide default
let isDragging = false,
	startPos = 0,
	currentTranslation = 0, // current transation value i.e by how much px translation should take place
	previousTranslation = 0,
	animationId,
	currentIndex = 0;

const draggingStart = index => event => {
	console.log("start");
	isDragging = true;
	currentIndex = index;
	startPos = getPositionOfPointer(event);
	sliderContainer.classList.add("grabbing");

	animationId = requestAnimationFrame(animationFunction); // tells browser to start animation specified by animationFn
};
const movingSlide = event => {
	if (isDragging) {
		const currentPosition = getPositionOfPointer(event);
		currentTranslation = previousTranslation + currentPosition - startPos;
	}
};
const draggingEnd = () => {
	cancelAnimationFrame(animationId);
	isDragging = false;
	sliderContainer.classList.remove("grabbing");
	const movedBy = currentTranslation - previousTranslation;
	// if moved enough negative X-direction, then snap to next slide if there is one
	if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

	// if moved enough positive X-direction, then snap to previous slide if there is one
	if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

	setSlideOnScreen();
};

const getPositionOfPointer = event =>
	event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;

// passed to requestAnimationFrame, last line is calling itself for animations to continue taking place till stopped explicitly, before that all lines are actual animations that will take place
const animationFunction = () => {
	slideTranslation();
	if (isDragging) requestAnimationFrame(animationFunction); // only do animation of sliding if isDragging true
};

const slideTranslation = () =>
	(sliderContainer.style.transform = `translateX(${currentTranslation}px)`);

const setSlideOnScreen = () => {
	currentTranslation = currentIndex * -window.innerWidth;
	previousTranslation = currentTranslation; // basically now that we have the slide to show on Screen reset previous and current to startPosition of this particular slide
	slideTranslation();
};
