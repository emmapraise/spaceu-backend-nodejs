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

const mergeDateAndTime = (isoDate: string, minutes: number): string => {
	const date = new Date(isoDate); // Convert ISO date string to Date object

	// Extract the date components
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth(); // Month is 0-based
	const day = date.getUTCDate();

	// Calculate hours and minutes from total minutes
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	// Create a new Date object with the merged date and time
	const mergedDate = new Date(Date.UTC(year, month, day, hours, mins));

	return mergedDate.toISOString(); // Convert back to ISO format
};

export const generateGoogleCalendarLink = (
	name: string,
	date: any,
	startTime: number, // ISO format (e.g., "2025-03-08T15:03:51.719Z")
	endTime: number, // ISO format (e.g., "2025-03-08T17:03:51.719Z")
	location?: string
): string => {
	const formatDate = (isoDate: string) =>
		new Date(isoDate).toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';

	const title =  `Booking for ${name}`
	const description = `Booking for ${name} with Space u `

	const googleCalendarUrl =
		`https://calendar.google.com/calendar/render?action=TEMPLATE` +
		`&text=${encodeURIComponent(title)}` +
		`&dates=${formatDate(mergeDateAndTime(date, startTime))}/${formatDate(
			mergeDateAndTime(date, endTime)
		)}` +
		(description ? `&details=${encodeURIComponent(description)}` : '') +
		(location ? `&location=${encodeURIComponent(location)}` : '');

	return googleCalendarUrl;
};

// console.log(mergeDateAndTime('2025-03-08T15:03:51.719Z', 480));