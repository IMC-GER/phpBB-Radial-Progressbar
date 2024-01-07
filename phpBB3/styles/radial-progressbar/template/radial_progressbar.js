/**
 *	Radial Progressbar
 */

 /**
 * @var	imcger	object for pphpBB.
 */
if (typeof imcger != 'object') {
	var imcger = {};
}

(function($) {  // Avoid conflicts with other libraries

	'use strict';

	/**
	 * @var	imcger	object for Radial Progressbar.
	 */
	imcger.radialProgBar = {};

	imcger.radialProgBar.throbberFilter = false;

	/**
	 * Returns the brightness of the colour
	 *
	 * @param	string	rgbColour	Colour in format rgb(r, g, b)
	 * @returns	int					Brightness of colour
	 */
	imcger.radialProgBar.getBrightness = function(rgbColour) {
		let colours = [];

		rgbColour = rgbColour.substring(rgbColour.indexOf('(') + 1, rgbColour.indexOf(')'));

		colours = rgbColour.split(',', 3);

		colours[0] = parseInt(colours[0]);
		colours[1] = parseInt(colours[1]);
		colours[2] = parseInt(colours[2]);

		return Math.round(Math.sqrt(0.299 * Math.pow(colours[0],2) + 0.587 * Math.pow(colours[1],2) + 0.114 * Math.pow(colours[2],2)));
	};

	$(document).ready(function() {
		phpbb.plupload.uploader.bind('FilesAdded', function(up, files) {
			let backgroundColour = $('#file-list td').css('background-color');
			
			$('.radial-progress-cover').css('stroke', backgroundColour);

			// Set the colour for the file progress spinner, depending on the background
			if (imcger.radialProgBar.getBrightness(backgroundColour) < 128 && !imcger.radialProgBar.throbberFilter) {
				$("head").append('<style>.file-status.file-working{filter:Invert();}</style>');
				imcger.radialProgBar.throbberFilter = true;
			}

			up.bind('UploadProgress', function(up, file) {
				$('.radial-progress-cover', '#' + file.id).attr('stroke-dashoffset', -(37.699 / 100) * file.percent);
			});
		});
	});
})(jQuery); // Avoid conflicts with other libraries
