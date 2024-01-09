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

	// Grundlegende Elemente des SVG stammen aus dem Artikel https://www.babbel.com/en/magazine/how-to-create-a-radial-progress-bar-with-svg
	let radialProgressGraphic = '<span class="svg radial-progress file-progress"><svg height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><circle class="radial-progress-background" r="6" cx="12" cy="12" stroke-dasharray="37.699" stroke-dashoffset="0" stroke="#27c627" /><path fill="currentColor" d="M 23.903924,11.825716 C 23.834046,5.2284212 18.423009,-0.06919306 11.825716,6.8338876e-4 5.2284216,0.07056024 -0.06919321,5.4815971 6.8339161e-4,12.078891 0.07056019,18.676185 5.4815973,23.973799 12.07889,23.903924 18.676186,23.834047 23.973799,18.423009 23.903924,11.825716 M 2.3910076,12.053574 c -0.055826,-5.2706649 4.189362,-9.6067415 9.4600244,-9.6625667 5.270665,-0.055825 9.606741,4.1893612 9.662567,9.4600257 0.05583,5.270663 -4.189361,9.60674 -9.460025,9.662567 C 6.7829102,21.56942 2.446833,17.324237 2.3910076,12.053574 M 17.293023,17.382143 9.333484,9.5894479 12.384216,6.4613194 10.681189,4.7939902 5.9511761,9.6252724 15.613743,19.0853 Z" style="fill:#008000;stroke-width:1.19524" /><path fill="currentColor" d="M 17.570365,17.292599 9.651262,9.4588109 12.718142,6.3465128 11.023767,4.670392 6.2688152,9.47713 15.882292,18.98704 Z" style="fill:#74ff74;stroke-width:1.19524" /><circle class="radial-progress-cover" r="6" cx="12" cy="12" stroke-dasharray="37.699" stroke-dashoffset="0" style="stroke:#646464;" /></svg></span>';

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

			$('.radial-progress-cover').css('stroke', $('#file-list td').css('background-color'));

			up.bind('UploadProgress', function(up, file) {
				$('.radial-progress-cover', '#' + file.id).attr('stroke-dashoffset', -(37.699 / 100) * file.percent);
			});
		});
	});
})(jQuery); // Avoid conflicts with other libraries
