const portfolio = {};

portfolio.spanEl = document.querySelector('#typewriter');
portfolio.wordArray = ['Designer.', 'Creator.', 'Learner.', 'Foodie.'];

portfolio.typeWord = async (word) => {
    const letters = word.split('');
    let currentLetterIndex = 0;

    //if the current word is less than the word array's length, keep typing through each letter
    while(currentLetterIndex < letters.length) {
        await portfolio.waitABit(100);
        portfolio.spanEl.append(letters[currentLetterIndex]);
        currentLetterIndex++;
    }
}

portfolio.deleteWord = async () => {
    const wordOnDOM = document.querySelector('#typewriter').innerText;
    const letters = wordOnDOM.split('');

    //delete each letter of the spliced word array until theres nothing and display it on the screen
    while (letters.length > 0) {
        await portfolio.waitABit(100);
        letters.pop();
        portfolio.spanEl.innerText = letters.join('');
    }
}

portfolio.typewriterEffect = async (wordList) => {
    let i = 0;

    while (true) {
        await portfolio.typeWord(wordList[i]);
        await portfolio.waitABit(1000);
        portfolio.deleteWord();
        await portfolio.waitABit(1000);
        i++;

        if (i >= portfolio.wordArray.length) {
            i = 0;
        }
    }
}

portfolio.waitABit = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

portfolio.navBarToggle = () => {
    const navBar = document.querySelector('#navBar');

    window.addEventListener('scroll', function() {
        if (this.window.scrollY > navBar.clientHeight + 20) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    })
}

portfolio.mobileMenu = () => {
    const hamEl = document.querySelector('#hamburger');
    const menuEl = document.querySelector('#navLinks');
    const topbunEl = document.querySelector('.topBun');
    const meatEl = document.querySelector('.meat');
    const botbunEl = document.querySelector('.bottomBun');

    //opening the slideout menu
    hamEl.addEventListener('click', function() {
        menuEl.classList.toggle('showMenu');
        topbunEl.classList.toggle('topBunClosed');
        meatEl.classList.toggle('meatClosed');
        botbunEl.classList.toggle('bottomBunClosed');
    })

    //closing the menu: through links
    const navLinks = document.querySelectorAll('#navLinks li');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuEl.classList.toggle('showMenu');
            topbunEl.classList.toggle('topBunClosed');
            meatEl.classList.toggle('meatClosed');
            botbunEl.classList.toggle('bottomBunClosed');
        })
    })

    //closing the menu by clicking anywhere
    window.addEventListener('click', function () {
        menuEl.classList.remove('showMenu');
        topbunEl.classList.remove('topBunClosed');
        meatEl.classList.remove('meatClosed');
        botbunEl.classList.remove('bottomBunClosed');
    })

    menuEl.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    
    hamEl.addEventListener('click', function (e) {
        e.stopPropagation();
    })
}

portfolio.handleFormSubmission = () => {
    const formEl = document.querySelector('#form');

    async function handleSubmit(e) {
        e.preventDefault();
        const buttonEl = document.querySelector("#sendEmail");
        const data = new FormData(e.target);
        
        fetch(e.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                buttonEl.innerText = "Email sent";
                buttonEl.disabled = true;
                buttonEl.classList.remove('redButton');
                buttonEl.classList.add('sendSuccess');

                setTimeout(() => {
                    buttonEl.innerText = "Send Message";
                    buttonEl.disabled = false;
                    buttonEl.classList.remove('sendSuccess');
                    buttonEl.classList.add('redButton');
                }, 2500);

                form.reset();
            } else {
                throw new Error (response.statusText);
            }
        }).catch(error => {
            buttonEl.innerText = "Error, try again";
            buttonEl.disabled = true;
            buttonEl.classList.remove('redButton');
            buttonEl.classList.add('sendFail');

            setTimeout(() => {
                buttonEl.innerText = "Send Message";
                buttonEl.disabled = false;
                buttonEl.classList.remove('sendFail');
                buttonEl.classList.add('redButton');
            }, 2500);
        });
    }    
    formEl.addEventListener("submit", handleSubmit);
  
}

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

portfolio.init = () => {
    portfolio.typewriterEffect(portfolio.wordArray);
    portfolio.navBarToggle();
    portfolio.mobileMenu();
    portfolio.handleFormSubmission();
    AOS.init();

    console.log('%cWhat comes first, the chicken or the egg?', 'color: #40cae0; font-size: 30px;')
    console.log(`                                                                   
            ████████                                  
            ██        ██                                
        ██▒▒▒▒        ██                              
        ██▒▒▒▒▒▒      ▒▒▒▒██                            
        ██▒▒▒▒▒▒      ▒▒▒▒██                            
    ██  ▒▒▒▒        ▒▒▒▒▒▒██                          
    ██                ▒▒▒▒██                          
    ██▒▒      ▒▒▒▒▒▒          ██                        
    ██      ▒▒▒▒▒▒▒▒▒▒        ██                        
    ██      ▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒██                        
    ██▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒██                        
    ██▒▒▒▒  ▒▒▒▒▒▒    ▒▒▒▒██                          
    ██▒▒▒▒            ▒▒▒▒██                          
        ██▒▒              ██                            
        ████        ████                              
            ████████                                  
veri nice, you found the eggy. 🍳                        
`)
}

portfolio.init();