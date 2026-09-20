// پیدا کردن عناصر مورد نیاز برای تغییر
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image');
const title = document.querySelector('.product-title');
const description = document.querySelector('.product-description');
const price = document.querySelector('.product-price');
const button = document.querySelector('.product-btn');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const container = document.querySelector('.container');

const FADE_DURATION = 300;
let currentIndex = 0;

let autoPlay;

// متغیرهای لازم برای پشتیبانی از تاچ در گوشی موبایل
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;


// تابعی که به طور کلی، تغییر تصویر و متن را تعریف می کند
function updateSlider(thumbnail) {
    // خواندن اطلاعات از اتریبیوت هایی که در اچ تی ام ال مشخص کرده ایم
    const image = thumbnail.dataset.image;
    const titleText = thumbnail.dataset.title;
    const descriptionText = thumbnail.dataset.description;
    const priceText = thumbnail.dataset.price;
    const link = thumbnail.dataset.link;

    // سپس اطلاعات خوانده شده را تغییر دهد
    // برای این که به آرامی تغییر کند، از این فانکشن استفاده کردیم
    slider.classList.add("fade")
    setTimeout(() => {
        mainImage.src = image;
        mainImage.alt = titleText;
        title.textContent = titleText;
        description.textContent = descriptionText;
        price.textContent = priceText;
        button.href = link;

        slider.classList.remove("fade")
    }, FADE_DURATION);


    // اینجا باید اکتیو هارا حذف کنیم که فقط موردی که روی آن کلیک شده است نمایش داده شود
    thumbnails.forEach(item => {
        item.classList.remove("active");
    });
    thumbnail.classList.add("active");

    // گرفتن ایندکس تصویر برای دکمه های قبلی و بعدی
    currentIndex = [...thumbnails].indexOf(thumbnail);
}


// باید به تک تک ثامب-نیل ها گوش بدیم
thumbnails.forEach((thumbnail) => {
    // حلقه ای که روی هرکدام کلیک شد، اطلاعات آن را بخواند
    thumbnail.addEventListener("click", () => {
        updateSlider(thumbnail);
    });
});

// تعریف عملکرد دکمه ی بعدی. اگر به آخر رسیدیم دوباره به عکس اول برگردد
function nextSlide(){
    currentIndex++;

    if (currentIndex >= thumbnails.length){
        currentIndex = 0;
    }

    updateSlider(thumbnails[currentIndex]);
}

nextBtn.addEventListener("click", () => {
    nextSlide();
});

// تعریف عملکرد دکمه ی قبلی و اگر به اولین عکس رسید، دوباره به آخرین عکس برود
function prevSlide(){
    currentIndex--;

    if (currentIndex < 0){
        currentIndex = thumbnails.length -1;
    }

    updateSlider(thumbnails[currentIndex]);
}

prevBtn.addEventListener("click", () => {
    prevSlide();
});

// تغییر خودکار عکس ها هر 8 ثانیه
function startAutoPlay(){
    stopAutoPlay();

    autoPlay = setInterval(() => {
        nextSlide();
    }, 8000)
}

function stopAutoPlay(){
    clearInterval(autoPlay);
}

// وقتی موس روی کانتینر قرار بگیرد، تغییر خودکار عکس متوقف شود
container.addEventListener("mouseenter", () => {
    stopAutoPlay();
});

// وقتی موس کنار رفت، تغییر خودکار شروع شود
container.addEventListener("mouseleave", () => {
    startAutoPlay();
});

// گرفتن مختصات جایی که انگشت روی صفحه گذاشته می شود
container.addEventListener("touchstart",(e)=>{
    stopAutoPlay();
    touchStartX = e.touches[0].clientX;
});

// گرفتن مختصات جایی که انگشت برداشته می شود
container.addEventListener("touchend",(e)=>{
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoPlay();
});

// تشخیص جهت لمس
function handleSwipe(){
    const distance = touchStartX - touchEndX;

    if(distance > minSwipeDistance){
        nextSlide();
    }

    else if(distance < -minSwipeDistance){
        prevSlide();
    }

}

// اجرای اولیه
thumbnails[0].click();
startAutoPlay();