document.addEventListener('DOMContentLoaded', function () {
    // get our elements
    const slider = document.querySelector('.slider-container'),
        slides = Array.from(document.querySelectorAll('.slide')),
        next = document.querySelector('#next'),
        prev = document.querySelector('#prev'),
        bulletsContainer = document.querySelector('#bullets');

    // set up our state
    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID,
        currentIndex = 0;

    // add our event listeners
    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector('img');
        // disable default image drag
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());
        // pointer events
        slide.addEventListener('pointerdown', pointerDown(index));
        slide.addEventListener('pointerup', pointerUp);
        slide.addEventListener('pointerleave', pointerUp);
        slide.addEventListener('pointermove', pointerMove);
        bulletsContainer.innerHTML += `<div class="bullet" data-id="${index}"></div>`;
    });

    bulletsContainer.children[currentIndex].classList.add('active');

    // make responsive to viewport changes
    window.addEventListener('resize', setPositionByIndex);

    // prevent menu popup on long press
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    // use a HOF so we have index in a closure
    function pointerDown(index) {
        return function (event) {
            currentIndex = index;
            startPos = event.clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        };
    }

    function pointerMove(event) {
        if (isDragging) {
            const currentPosition = event.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function pointerUp() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // if moved enough negative then snap to next slide if there is one
        if (movedBy < -100 && currentIndex < slides.length - 1)
            currentIndex += 1;

        // if moved enough positive then snap to previous slide if there is one
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();

        slider.classList.remove('grabbing');
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth;
        bulletsContainer.querySelector('.active').classList.remove('active');
        bulletsContainer.children[currentIndex].classList.add('active');
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    // buttons
    next.addEventListener('click', () => {
        if (currentIndex >= slides.length - 1) return;
        currentIndex += 1;
        setPositionByIndex();
    });

    prev.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex -= 1;
        setPositionByIndex();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (currentIndex >= slides.length - 1) return;
            currentIndex += 1;
            setPositionByIndex();
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex <= 0) return;
            currentIndex -= 1;
            setPositionByIndex();
        }
    });

    // bullets
    bulletsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('bullet')) {
            currentIndex = parseInt(e.target.dataset.id);
            setPositionByIndex();
        }
    });

    // interval

    const interval = setInterval(() => {
        if (currentIndex >= slides.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        setPositionByIndex();
    }, 3000);
});
