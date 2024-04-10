const changeNav = (entries, observer) => {
	entries.forEach((entry) => {
		if(entry.isIntersecting && entry.intersectionRatio >= 0.85) {
			document.querySelector('.link-active').classList.remove('link-active');
			const id = entry.target.getAttribute('id');
			console.log(id);
			const newLink = document.querySelector(`[href="#${id}"]`).parentElement.classList.add('link-active');
		}
	});
}

const options = {
	threshold: 0.85
}

const observer = new IntersectionObserver(changeNav, options);

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
	observer.observe(section);
});