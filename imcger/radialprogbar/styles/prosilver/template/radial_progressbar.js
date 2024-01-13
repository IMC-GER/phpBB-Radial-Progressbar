/**
 * Radial Progressbar
 * An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2024, Thorsten Ahlers
 * @license GNU General Public License, version 2 (GPL-2.0)
 */

 /**
 * @var	imcger	object for pphpBB.
 */
if (typeof imcger != 'object') {
	var imcger = {};
}

(function($) {  // Avoid conflicts with other libraries

	'use strict';

	imcger.radialProgBar = {};
	imcger.radialProgBar.throbberFilter = false;

	// Animated element of the SVG comes from the article https://www.babbel.com/en/magazine/how-to-create-a-radial-progress-bar-with-svg
	let radialProgressGraphic = '<span class="svg radial-progress file-progress"><svg height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><circle class="radial-progress-background" cx="12" cy="12" r="6" stroke="#27c627" /><path fill="#008000" d="m 23.9045,11.9525 c 0,-6.598 -5.355,-11.952 -11.953,-11.952 -6.597,0 -11.952,5.354 -11.952,11.952 0,6.598 5.355,11.952 11.952,11.952 6.598,0 11.953,-5.354 11.953,-11.952 m -21.515,0 c 0,-5.271 4.291,-9.562 9.562,-9.562 5.271,0 9.562,4.29 9.562,9.562 0,5.27 -4.29,9.562 -9.562,9.562 -5.27,0 -9.562,-4.291 -9.562,-9.562 m 14.845,5.485 -7.876,-7.877 3.083,-3.095 -1.685,-1.685 -4.78,4.78 9.561,9.562 z" stroke-width="1.19524" /><path fill="#74ff74" d="M 17.58,17.32 9.703,9.445 12.787,6.349 11.102,4.664 l -4.781,4.78 9.562,9.563 z" stroke-width="1.19524" /><circle class="radial-progress-cover" cx="12" cy="12" r="6" stroke-dasharray="37.699" stroke-dashoffset="0" style="stroke:#646464;" /></svg></span>';

	// Remove linear and add the radial progressbar in the row template
	$('#attach-row-tpl .file-progress').remove();
	$('#attach-row-tpl td.attach-status').prepend(radialProgressGraphic);

	/**
	 * Returns the brightness of the colour
	 *
	 * @param	{string}	rgbColour	Colour in format rgb(r, g, b)
	 * @returns	{int}					Brightness of colour (0 - 255)
	 */
	imcger.radialProgBar.getBrightness = function(rgbColour) {
		let colours = [];

		rgbColour = rgbColour.substring(rgbColour.indexOf('(') + 1, rgbColour.indexOf(')'));

		colours = rgbColour.split(',', 3);

		colours[0] = parseInt(colours[0]);
		colours[1] = parseInt(colours[1]);
		colours[2] = parseInt(colours[2]);

		// Format Rec. 601 (http://alienryderflex.com/hsp.html)
		return Math.round(Math.sqrt(0.299 * Math.pow(colours[0], 2) + 0.587 * Math.pow(colours[1], 2) + 0.114 * Math.pow(colours[2], 2)));
	};

	// Set the colour for the file progress spinner, depending on the background
	if (imcger.radialProgBar.getBrightness($('#file-list td').css('background-color')) < 128 && !imcger.radialProgBar.throbberFilter) {
		$("head").append('<style>.file-status.file-working{filter:Invert();}</style>');
		imcger.radialProgBar.throbberFilter = true;
	}

	$(document).ready(function() {
		phpbb.plupload.uploader.bind('FilesAdded', function(up, files) {
			$.each(files, function(i, file) {
				$('.radial-progress-cover', '#' + file.id).css('stroke', $('.attach-status', '#' + file.id).css('background-color'));
			});

			up.bind('UploadProgress', function(up, file) {
				$('.radial-progress-cover', '#' + file.id).attr('stroke-dashoffset', -(37.699 / 100) * file.percent);
			});
		});
	});
})(jQuery); // Avoid conflicts with other libraries
