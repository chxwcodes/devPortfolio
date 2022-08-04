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
    document.addEventListener('click', function(e) {
        console.log(e.target)
        if (e.target.id !== 'hamburger' && e.target.id !== 'navLinks') {
            menuEl.classList.remove('showMenu');
            topbunEl.classList.remove('topBunClosed');
            meatEl.classList.remove('meatClosed');
            botbunEl.classList.remove('bottomBunClosed');
        }
    })
}

portfolio.init = () => {
    portfolio.typewriterEffect(portfolio.wordArray);
    portfolio.navBarToggle();
    portfolio.mobileMenu();
}

portfolio.init();