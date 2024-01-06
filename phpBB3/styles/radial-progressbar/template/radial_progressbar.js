/**
 *	Radial Progressbar
 */
$(document).ready(function() {
	phpbb.plupload.uploader.bind('FilesAdded', function(up, files) {
		$('.radial-progress-cover').css('stroke', $('#file-list td').css('background-color'));

		up.bind('UploadProgress', function(up, file) {
			$('.radial-progress-cover', '#' + file.id).attr('stroke-dashoffset', -(37.699 / 100) * file.percent);
		});
	});
});
