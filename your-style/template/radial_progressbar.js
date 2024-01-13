/**
 * Radial Progressbar
 * An style add-on for the phpBB Forum Software package.
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

	/**
	 * Returns the brightness of the colour
	 *
	 * @param	{string}	rgbColour	Colour in format rgb(r, g, b)
	 * @returns	{int}					Brightness of colour
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
