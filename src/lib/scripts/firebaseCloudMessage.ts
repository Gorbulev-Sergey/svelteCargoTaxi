let authorizationKey =
	'key=AAAAwAwwrpU:APA91bFvwPEwjJT9SjMo6u7DPWdB9msy6sbeis6JKvr1V-HBPWMQTv4SfCpLnNmbZSpRUrnFntW0YsRAQGm4t3vlIXKTl5e5tBU_2Fnc5_kQf2afQ9JeTm1WC152sPIDV8u60WGiuANv';

export let sendFCM = (theme: string, title: string, text: string) => {
	return new Promise((res, rej) => {
		// Очень важный код
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: authorizationKey
			},
			body: JSON.stringify({
				to: `/topics/${theme}`,
				notification: {
					body: text,
					title: title
				}
			})
		}).then(s => {
			if (s.ok) res(s.ok);
			else res(!s.ok);
		});
	});
};

export let sendFCMData = (theme: string, title: string, text: string, dataMap: Map<string, string>) => {
	let dataArray = [...dataMap];
	return new Promise((res, rej) => {
		// Очень важный код
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: authorizationKey
			},
			body: JSON.stringify({
				to: `/topics/${theme}`,
				data: {
					body: text,
					title: title,
					dataArray
				}
			})
		}).then(s => {
			if (s.ok) res(s.ok);
			else res(!s.ok);
		});
	});
};

let sendFCM1 = (theme = '', title = '', text = '') => {
	// Очень важный код
	fetch('https://fcm.googleapis.com/fcm/send', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			Authorization: authorizationKey
		},
		body: JSON.stringify({
			to: `/topics/${theme}`,
			notification: {
				body: text,
				title: title
			}
		})
	});
};
