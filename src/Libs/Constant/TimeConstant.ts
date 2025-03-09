export enum TimeSlotEnum {
	_8AM = 480, // 8 * 60
	_9AM = 540, // 9 * 60
	_10AM = 600, // 10 * 60
	_11AM = 660, // 11 * 60
	_12PM = 720, // 12 * 60
	_1PM = 780, // 1 PM -> 13 * 60
	_2PM = 840, // 2 PM -> 14 * 60
	_3PM = 900, // 3 PM -> 15 * 60
	_4PM = 960, // 4 PM -> 16 * 60
	_5PM = 1020, // 5 PM -> 17 * 60
	_6PM = 1080, // 6 PM -> 18 * 60
}

export const convertMinutesToTime = (minutes: number): string => {
	const hours24 = Math.floor(minutes / 60);
	const minutesPastHour = minutes % 60;
	const period = hours24 >= 12 ? 'PM' : 'AM';

	let hours12 = hours24 % 12;
	if (hours12 === 0) hours12 = 12; // Convert 0 to 12 for 12-hour format

	return `${hours12}:${minutesPastHour.toString().padStart(2, '0')} ${period}`;
};
export const formatDate = (isoDate: string): string => {
	const date = new Date(isoDate);

	// Extract day, month, and year separately to avoid issues with commas
	const day = date.getUTCDate();
	const month = date.toLocaleString('en-US', { month: 'long' });
	const year = date.getUTCFullYear();

	// Function to add ordinal suffix (st, nd, rd, th)
	const getOrdinalSuffix = (day: number) => {
		if (day >= 11 && day <= 13) return `${day}th`;
		switch (day % 10) {
			case 1:
				return `${day}st`;
			case 2:
				return `${day}nd`;
			case 3:
				return `${day}rd`;
			default:
				return `${day}th`;
		}
	};

	return `${getOrdinalSuffix(day)} ${month}, ${year}`;
};
console.log(formatDate('2025-03-08T15:03:51.719Z'));
// console.log(convertMinutesToTime(TimeSlotEnum._12PM))
