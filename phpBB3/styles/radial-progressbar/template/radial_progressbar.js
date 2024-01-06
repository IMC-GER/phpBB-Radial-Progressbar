/**
 *	Radial Progressbar
 */

 /**
 * @var	imcger	object for pphpBB.
 */
if (typeof imcger != 'object') {
	var imcger = {};
}

imcger.getBrightness = function(rgbColour) {
	let colours = [];

	rgbColour = rgbColour.substring(rgbColour.indexOf('(') + 1, rgbColour.indexOf(')'));

	colours = rgbColour.split(',', 3);

	colours[0] = parseInt(colours[0]);
	colours[1] = parseInt(colours[1]);
	colours[2] = parseInt(colours[2]);

	return Math.round(Math.sqrt(0.299 * Math.pow(colours[0],2) + 0.587 * Math.pow(colours[1],2) + 0.114 * Math.pow(colours[2],2)));
}

$(document).ready(function() {
	phpbb.plupload.uploader.bind('FilesAdded', function(up, files) {
		$('.radial-progress-cover').css('stroke', $('#file-list td').css('background-color'));

		if (imcger.getBrightness($('#file-list td').css('background-color')) < 128) {
			$("head").append('<style>.file-status.file-working{filter: Invert();}</style>');
		}

		up.bind('UploadProgress', function(up, file) {
			$('.radial-progress-cover', '#' + file.id).attr('stroke-dashoffset', -(37.699 / 100) * file.percent);
		});
	});
});
