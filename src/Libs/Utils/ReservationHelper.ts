export const calculateEndTime = (startTime: number, duration: number) => {
	return Number(startTime + duration * 60);
};

export const convertMinutesToTime = (minutes: any): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	const period = hours >= 12 ? 'PM' : 'AM';

	// Convert 24-hour format to 12-hour format
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMins = mins.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMins} ${period}`;
};

export const formatDate = (date: Date): string =>{
	const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}
