const telegraphNodes = user => {
	if (user.status === null) {
		return {
			access_token: user.telegraph_access_token,
			token: 123,
			title: `${user.name}'s SpotifyPlayback`,
			path: user.telegraph_path,
			author_name: 'SpotifyPlayback',
			author_url: 'https://t.me/SpotifyPlaybackbot',
			content: [{ tag: 'p', children: ['Not Litening to anything right now'] }]
		};
	} else if (user.status === 'error') {
		return {
			access_token: user.telegraph_access_token,
			token: 123,
			title: `${user.name}'s SpotifyPlayback`,
			path: user.telegraph_path,
			author_name: 'SpotifyPlayback',
			author_url: 'https://t.me/SpotifyPlaybackbot',
			content: [{ tag: 'p', children: [user.error] }]
		};
	} else {
		return {
			access_token: user.telegraph_access_token,
			token: 123,
			title: `${user.name}'s SpotifyPlayback`,
			path: user.telegraph_path,
			author_name: 'SpotifyPlayback',
			author_url: 'https://t.me/SpotifyPlaybackbot',
			content: [
				{
					tag: 'p',
					children: [
						'Litening to ',
						{
							tag: 'a',
							attrs: { href: user.status.song_link },
							children: [user.status.song]
						},
						' by ',
						{
							tag: 'a',
							attrs: { href: user.status.artist_link },
							children: [user.status.artist]
						}
					]
				},
				{
					tag: 'img',
					attrs: {
						src: user.status.album_art,
						alt: 'Album Art'
					}
				}
			]
		};
	}
};
export default telegraphNodes;
