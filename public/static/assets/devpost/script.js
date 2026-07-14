const changeNav = (entries) => {
	entries.forEach((entry) => {
		if(entry.isIntersecting && entry.intersectionRatio >= 0.85) {
			document.querySelector('.link-active').classList.remove('link-active');
			const id = entry.target.parentElement.getAttribute('id');
			document.querySelector(`[href="#${id}"]`).parentElement.classList.add('link-active');
		}
	});
}

const options = {
	threshold: 1,
	rootMargin: "0px 0px -70% 0px"
}

const observer = new IntersectionObserver(changeNav, options);

const sections = document.querySelectorAll('h2');
sections.forEach((section) => {
	observer.observe(section);
});
