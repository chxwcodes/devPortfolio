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
        if (e.target.id !== 'hamburger' && e.target.id !== 'navLinks') {
            menuEl.classList.remove('showMenu');
            topbunEl.classList.remove('topBunClosed');
            meatEl.classList.remove('meatClosed');
            botbunEl.classList.remove('bottomBunClosed');
        }
    })
}

portfolio.myProjects = [
    {
        asset: './images/urban-score.mp4',
        title: 'Urban Score',
        tools: 'HTML5 / Sass / Javascript / REST API / Pair Programming',
        desc: `Urban City is an app that's powered by vanilla Javascript and REST API. It has all the world's urban cities. Based on your selected city, it will give a score based on that city's quality of life. It measures everything from housing to education. You can save as many cities as you wish to compare.`,
        liveURL: 'https://urban-score.netlify.app/',
        repoURL: 'https://github.com/Max-Chow-project2/urban-score'
    },
    {
        asset: './images/urban-score.mp4',
        title: 'GameLogo+',
        tools: 'HTML5 / Sass / jQuery /Photoshop',
        desc: `A fun quiz powered by jQuery that tests your knowledge of various video game studios' logos. Logos have been altered with Adobe Photoshop to be extra hard. Can you guess them all?`,
        liveURL: 'https://gamelogoquiz.netlify.app/',
        repoURL: 'https://github.com/chxwcodes/gameStudioQuiz'
    },
    {
        asset: './images/urban-score.mp4',
        title: `What's 4 Dinnr?`,
        tools: 'HTML5 / Sass / jQuery /REST API',
        desc: `Tired and can't decide on what to make for dinner? Want to get rid of whatever foods that's left over in your fridge before grocery shopping? Let this app decide for you based on what you have in your fridge! It also considers your calories and dietary restrictions.`,
        liveURL: 'https://gamelogoquiz.netlify.app/',
        repoURL: 'https://github.com/chxwcodes/gameStudioQuiz'
    }
]

portfolio.populateProjects = () => {
    const projectSectionEl = document.querySelector('#projects .wrapper');

    portfolio.myProjects.forEach(project => {
        const projectContainer = document.createElement('article');
        projectContainer.classList.add('workItem');
        projectContainer.innerHTML = `
        <div class="projectImgContainer">
            <video src=${project.asset} autoplay loop playsinline muted></video>
        </div>
        <div class="projectTextContainer">
            <h3>${project.title}</h3>
            <p class="projectTools">${project.tools}</p>
            <p>${project.desc}</p>

            <div class="projectLinks">
                <a href=${project.liveURL} class="cyanButton">View live</a>
                <a href=${project.repoURL} class="blackButtonOutline">View repo</a>
            </div>
        </div>
        `;
        projectSectionEl.appendChild(projectContainer);
    })
}

portfolio.init = () => {
    portfolio.typewriterEffect(portfolio.wordArray);
    portfolio.navBarToggle();
    portfolio.mobileMenu();
    portfolio.populateProjects();
}

portfolio.init();