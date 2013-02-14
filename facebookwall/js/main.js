$(function() {

	var $container = $('#facebookwall');

	var boxFormatList = [{
		name: 'col1',
		width: '80',
		height: '80'
	}, {
		name: 'col2',
		width: '180',
		height: '180'
	}, {
		name: 'col3',
		width: '280',
		height: '280'
	}, {
		name: 'col4',
		width: '380',
		height: '380'
	}];

	var fanpageList = ["RTBF", "rtbfinfo", "RTBFSport", "RTBFvideo", "RTBFTV", "nolimitrtbf", "tout.ca", "RTBFqalu", "sanschichis", "HepTaxi", "RTBF.D6bels", "cap48", "cinestation", "livresadomicile", "thevoicebelgique", "thevoicebelgique.maureenlouys", "RTBFMeteo", "LSDJV", "cdbrtbf", "CommeUnChefRTBF", ];

	var batch = [];
	$.each(fanpageList, function(key, data) {
		var relative_url = data + "?fields=id,username,name,link,likes,cover";
		batch.push({
			"method": "GET",
			"relative_url": relative_url
		});
	});

	var data = {
		access_token: 'AAACEdEose0cBAFclhTU7oyJCx3BEEbnjMpdN38v97KVtcj0UlZADWoZBtsA0sf3769VvfW5IaRUojKcGuORpmamxZBdHyiOnYeqqxIbwQZDZD',
		batch: JSON.stringify(batch)
	};

	$.post('https://graph.facebook.com', data, function(response) {

		var items = [];

		$.each(response, function(key, value) {

			var data, html, imageUrl, boxFormat;

			if(value && value.body) {
				data = JSON.parse(value.body);
				boxFormat = boxFormatList[Math.floor(Math.random() * boxFormatList.length)];
				imageUrl = 'https://graph.facebook.com/' + data.username + '/picture?width=' + boxFormat.width + '&height=' + boxFormat.height;
				formatLikeNumber = Math.max(0, data.likes).toFixed(0).replace(/(?=(?:\d{3})+$)(?!^)/g, ',');
				html = '<div class="box photo ' + boxFormat.name + '">';
				html += '<a href="' + data.link + '" title="' + data.name + '" target="_blank"><img src="' + imageUrl + '" alt="' + data.name + '" /></a>';
				html += '<span class="count">' + formatLikeNumber + '</span>';
				html += '</div>';
				items.push(html);
			}
		});

		var $boxes = $(items.join(''));

		$container.append($boxes);

		$container.imagesLoaded(function() {
			$container.masonry({
				itemSelector: '.box',
				isAnimated: !Modernizr.csstransitions
			});
		});

		// $container.append($boxes).masonry('appended', $boxes);
	}, 'json');
})