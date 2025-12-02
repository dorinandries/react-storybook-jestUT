// "Mon Jan 25"
const STAGE_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
	weekday: 'short',
	month: 'short',
	day: '2-digit',
});

// "19:21"
const STAGE_TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', {
	hour: '2-digit',
	minute: '2-digit',
});

export const formatStageDate = (d: Date) =>
	STAGE_DATE_FORMATTER.format(d).replace(',', ''); // remove comma to match mock

export const formatStageTime = (d: Date) => STAGE_TIME_FORMATTER.format(d);

export const stageDateTimeFromISO = (iso: string) => {
	const d = new Date(iso);
	return {
		date: formatStageDate(d),
		time: formatStageTime(d),
	};
};

export const getDateTime = () => {
	const d = new Date();
	return {
		date: formatStageDate(d),
		time: formatStageTime(d),
	};
};

// Backward-compatible name used by cards/details for createdAt
export const formatDateTime = (iso: string) => stageDateTimeFromISO(iso);
