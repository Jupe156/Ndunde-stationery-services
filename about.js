const cardSlider = document.querySelector('.card-slider');
const cardStrip = document.querySelector('.management');
const cards = Array.from(document.querySelectorAll('.management-container'));

if (cardSlider && cardStrip && cards.length > 0) {
    let currentCard = 0;
    let cardStep = 0;
    let autoplayId = null;
    let isPaused = false;

    const getGap = () => {
        const sliderStyles = window.getComputedStyle(cardSlider);
        const gapValue = sliderStyles.gap || sliderStyles.columnGap || '0px';
        return Number.parseFloat(gapValue) || 0;
    };

    const measureStep = () => {
        const firstCard = cards[0];
        if (!firstCard) {
            cardStep = 0;
            return;
        }

        cardStep = firstCard.getBoundingClientRect().width + getGap();
    };

    const getMaxOffset = () => {
        return Math.max(cardSlider.scrollWidth - cardStrip.clientWidth, 0);
    };

    const updatePosition = () => {
        measureStep();
        const rawOffset = currentCard * cardStep;
        const offset = Math.min(rawOffset, getMaxOffset());
        cardSlider.style.transform = `translateX(-${offset}px)`;
    };

    const nextCard = () => {
        if (!cards.length) {
            return;
        }

        currentCard = (currentCard + 1) % cards.length;
        updatePosition();
    };

    const startAutoplay = () => {
        if (autoplayId || cards.length < 2) {
            return;
        }

        autoplayId = window.setInterval(() => {
            if (!isPaused) {
                nextCard();
            }
        }, 3200);
    };

    const stopAutoplay = () => {
        if (autoplayId) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    };

    cardStrip.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    cardStrip.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    window.addEventListener('resize', () => {
        updatePosition();
    });

    updatePosition();
    startAutoplay();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            updatePosition();
            startAutoplay();
        }
    });
}


