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

portfolio.myProjects = [
	{
		animate: 'fade-down',
		asset: './images/backronym-gen.mp4',
		title: 'Backronym Generator',
		tools: 'React / Firebase / REST API / Agency Programming',
		desc: `A fun acronym generator created based off on a cilent brief. Authenticated users can create their custom acronym with the help of Datamuse API, which is then stored in a community gallery. Other features include: profanity filter, Google Ngram with Chart.js, CRUD for saved words, liking system with local storage, anonymous mode, enhanced UI, and many more. Created with 3 other developers.`,
		liveURL: 'https://bckronym-generator.netlify.app/login',
		repoURL: 'https://github.com/chxwcodes/backronym-gen'
	},
	{
		animate: 'fade-right',
		asset: './images/trivia-me.mp4',
		title: 'Trivia Me',
		tools: 'Javascript / React / Firebase / REST API',
		desc: `Trivia Me is a game powered by REST API and React.js. Users can test themselves in a wide range of topics ranging from video games to anime. Match scores are then stored in Firebase. Users can then choose how to view the saved scores (most recent, highest score, etc). A solo coding project.`,
		liveURL: 'https://trivia-me.netlify.app/',
		repoURL: 'https://github.com/chxwcodes/project3-trivia/tree/production'
	},
	{
		animate: 'fade-down',
		asset: './images/urban-score.mp4',
		title: 'Urban Score',
		tools: 'HTML5 / Sass / Javascript / REST API / Pair Programming',
		desc: `Urban City is an app that's powered by vanilla Javascript and REST API. It has all the world's urban cities. Based on your selected city, it will give a score based on that city's quality of life. It measures everything from housing to education. You can save as many cities as you wish to compare.`,
		liveURL: 'https://urban-score.netlify.app/',
		repoURL: 'https://github.com/Max-Chow-project2/urban-score'
	},
	{
		animate: 'fade-right',
		asset: './images/gamelogo.mp4',
		title: 'GameLogo+',
		tools: 'HTML5 / Sass / jQuery / Photoshop',
		desc: `A fun quiz powered by jQuery that tests your knowledge of various video game studios' logos. Logos have been altered with Adobe Photoshop to be extra hard. Can you guess them all?`,
		liveURL: 'https://gamelogoquiz.netlify.app/',
		repoURL: 'https://github.com/chxwcodes/gameStudioQuiz'
	},
	{
		animate: 'fade-down',
		asset: './images/whats4dinnr.mp4',
		title: `What's 4 Dinnr?`,
		tools: 'HTML5 / Sass / jQuery / REST API',
		desc: `Tired and can't decide on what to make for dinner? Want to get rid of whatever foods that's left over in your fridge? Let this app decide for you based on what you have in your fridge! It also considers your calories and dietary restrictions, if the user has any. Worked together with a UI designer (design provided).`,
		liveURL: 'https://whats4dinnr.netlify.app/',
		repoURL: 'https://github.com/chxwcodes/whats4dinnr'
	}
]

portfolio.populateProjects = () => {
	const projectSectionEl = document.querySelector('#projects .wrapper');

	portfolio.myProjects.forEach(project => {
		const projectContainer = document.createElement('article');
		projectContainer.classList.add('workItem');
		projectContainer.setAttribute('data-aos', project.animate);
		projectContainer.innerHTML = `
			<div class="projectImgContainer">
					<video src=${project.asset} autoplay loop playsinline muted></video>
			</div>
			<div class="projectTextContainer">
				<h3>${project.title}</h3>
				<code class="projectTools">${project.tools}</code>
				<p>${project.desc}</p>
				<div class="projectLinks">
					<a href=${project.liveURL} target="_blank" class="cyanButton">View live</a>
					<a href=${project.repoURL} target="_blank" class="blackButtonOutline">View repo</a>
				</div>
			</div>
			`;
		projectSectionEl.appendChild(projectContainer);
	})
}

portfolio.handleFormSubmission = () => {
	const formEl = document.querySelector('#form');

	async function handleSubmit(e) {
		e.preventDefault();
		const buttonEl = document.querySelector('#sendEmail');
		const formData = new FormData(e.target);

		// if captcha is checked, submit the form
		if (grecaptcha.getResponse().length > 0) {
			fetch('/', {
				method: 'POST',
				body: new URLSearchParams(formData).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				if (response.ok) {
					buttonEl.innerText = 'Email sent';
					buttonEl.disabled = true;
					buttonEl.classList.remove('redButton');
					buttonEl.classList.add('sendSuccess');

					setTimeout(() => {
						buttonEl.innerText = 'Send Message';
						buttonEl.disabled = false;
						buttonEl.classList.remove('sendSuccess');
						buttonEl.classList.add('redButton');
					}, 2500);

					form.reset();
				} else {
					throw new Error(response.statusText);
				}
			}).catch(() => {
				buttonEl.innerText = 'Error, try again';
				buttonEl.disabled = true;
				buttonEl.classList.remove('redButton');
				buttonEl.classList.add('sendFail');

				setTimeout(() => {
					buttonEl.innerText = 'Send Message';
					buttonEl.disabled = false;
					buttonEl.classList.remove('sendFail');
					buttonEl.classList.add('redButton');
				}, 2500);
			});
		} else {
			const errorEl = document.querySelector('.errorMsg');
			errorEl.style.display = 'block';

			setTimeout(() => {
				errorEl.style.display = 'none';
			}, 2500);
		}
        
	}    
	formEl.addEventListener('submit', handleSubmit);
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
	duration: 800, // values from 0 to 3000, with step 50ms
	easing: 'ease-in-out', // default easing for AOS animations
	once: true, // whether animation should happen only once - while scrolling down
	mirror: true, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

portfolio.init = () => {
	portfolio.typewriterEffect(portfolio.wordArray);
	portfolio.navBarToggle();
	portfolio.mobileMenu();
	portfolio.populateProjects();
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