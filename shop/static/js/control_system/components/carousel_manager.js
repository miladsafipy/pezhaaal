class ProductGallery {

    constructor(element) {

        this.gallery = element;

        this.mainImage =
            this.gallery.querySelector('[data-gallery-main]');

        this.thumbnails =
            [...this.gallery.querySelectorAll('[data-gallery-thumb]')];

        this.currentIndex = 0;

        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }


    init() {

        if (!this.mainImage || !this.thumbnails.length) {
            return;
        }

        this.bindEvents();

    }


    bindEvents() {

        this.thumbnails.forEach((thumbnail, index) => {

            thumbnail.addEventListener('click', () => {

                this.showImage(index);

            });

        });


        this.gallery.addEventListener(
            'touchstart',
            (event) => {

                this.touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        this.gallery.addEventListener(
            'touchend',
            (event) => {

                this.touchEndX =
                    event.changedTouches[0].screenX;

                this.handleSwipe();

            },
            { passive: true }
        );

    }


    showImage(index) {

        if (
            index < 0 ||
            index >= this.thumbnails.length
        ) {
            return;
        }


        const thumbnail =
            this.thumbnails[index];


        const thumbnailImage =
            thumbnail.querySelector('img');


        if (!thumbnailImage) {
            return;
        }


        this.currentIndex = index;


        this.mainImage.src =
            thumbnailImage.src;


        this.mainImage.alt =
            thumbnailImage.alt;


        this.updateActiveThumbnail();

    }


    updateActiveThumbnail() {

        this.thumbnails.forEach(
            (thumbnail, index) => {

                const isActive =
                    index === this.currentIndex;


                thumbnail.classList.toggle(
                    'is-active',
                    isActive
                );


                thumbnail.setAttribute(
                    'aria-current',
                    isActive ? 'true' : 'false'
                );

            }
        );

    }


    handleSwipe() {

        const swipeDistance =
            this.touchEndX - this.touchStartX;


        const minimumSwipeDistance = 50;


        if (
            Math.abs(swipeDistance) <
            minimumSwipeDistance
        ) {
            return;
        }


        if (swipeDistance > 0) {

            this.previous();

        } else {

            this.next();

        }

    }


    next() {

        const nextIndex =
            (this.currentIndex + 1) %
            this.thumbnails.length;


        this.showImage(nextIndex);

    }


    previous() {

        const previousIndex =
            (
                this.currentIndex -
                1 +
                this.thumbnails.length
            ) %
            this.thumbnails.length;


        this.showImage(previousIndex);

    }


    showImage(index) {

        if (
            index < 0 ||
            index >= this.thumbnails.length
        ) {
            return;
        }


        const thumbnail =
            this.thumbnails[index];

        const thumbnailImage =
            thumbnail.querySelector('img');


        if (!thumbnailImage) {
            return;
        }


        this.mainImage.classList.add('is-changing');


        setTimeout(() => {

            this.currentIndex = index;

            this.mainImage.src =
                thumbnailImage.src;

            this.mainImage.alt =
                thumbnailImage.alt;

            this.updateActiveThumbnail();

            this.mainImage.classList.remove(
                'is-changing'
            );

        }, 150);

    }

}




// every gallery that have "data-gallery" can use this control system

document
    .querySelectorAll('[data-gallery]')
    .forEach((gallery) => {

        new ProductGallery(gallery);

    });


