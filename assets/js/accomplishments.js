/*
	Collapses the accomplishments list to the first few entries, behind a
	toggle.

	This is applied by script rather than by stylesheet on purpose: with
	scripting unavailable the list stays fully expanded, which is the safe
	outcome. Collapsing in CSS would hide most of the content with no way to
	reveal it.
*/

(function () {

	'use strict';

	var VISIBLE = 5;

	var list = document.getElementById('accomplishments'),
		actions = document.getElementById('accomplishments-actions'),
		toggle = document.getElementById('accomplishments-toggle');

	if (!list || !actions || !toggle)
		return;

	var articles = Array.prototype.slice.call(list.querySelectorAll('article')),
		collapsible = articles.slice(VISIBLE);

	// Nothing to collapse — leave the list alone and the toggle hidden.
	if (collapsible.length < 1)
		return;

	function render(collapsed) {

		collapsible.forEach(function (article) {
			article.hidden = collapsed;
		});

		toggle.setAttribute('aria-expanded', String(!collapsed));
		toggle.textContent = collapsed
			? 'See ' + collapsible.length + ' more'
			: 'See less';

	}

	render(true);
	actions.hidden = false;

	toggle.addEventListener('click', function () {

		// The next collapsed state is whatever the current expanded state is:
		// expanded now means collapse on this click, and vice versa.
		var collapsed = toggle.getAttribute('aria-expanded') === 'true';

		render(collapsed);

		// Collapsing removes a lot of height at once, which can leave the
		// viewport below the section entirely. Pull the heading back up.
		if (collapsed) {

			var section = document.getElementById('three');

			if (section && section.getBoundingClientRect().top < 0)
				section.scrollIntoView({ block: 'start' });

		}

	});

}());
