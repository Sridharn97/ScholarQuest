/**
 * Format a Date object into YYYYMMDDTHHMMSSZ for calendar links
 * By default, this sets the deadline to 11:59 PM (23:59:00) of the given date if time isn't specified
 */
const formatICSDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  // Set time to 23:59:00 to represent end of day deadline
  date.setHours(23, 59, 0, 0);
  
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  const YYYY = date.getUTCFullYear();
  const MM = pad(date.getUTCMonth() + 1);
  const DD = pad(date.getUTCDate());
  const HH = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());

  return `${YYYY}${MM}${DD}T${HH}${mm}${ss}Z`;
};

/**
 * Generate a Google Calendar event URL
 */
export const generateGoogleCalendarLink = (title, details, deadlineDate) => {
  const formattedDate = formatICSDate(deadlineDate);
  if (!formattedDate) return '#';

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details || '',
    dates: `${formattedDate}/${formattedDate}`, // Same start and end time for deadline
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate an .ics file string for Apple Calendar / Outlook
 */
export const generateICSFile = (title, details, deadlineDate) => {
  const formattedDate = formatICSDate(deadlineDate);
  if (!formattedDate) return null;

  const now = new Date();
  const formattedNow = formatICSDate(now.toISOString());

  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ScholarQuest//Scholarship Tracker//EN',
    'BEGIN:VEVENT',
    `DTSTAMP:${formattedNow}`,
    `DTSTART:${formattedDate}`,
    `DTEND:${formattedDate}`,
    `SUMMARY:Deadline: ${title}`,
    `DESCRIPTION:${details || ''}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT24H', // Reminder 24 hours before
    'ACTION:DISPLAY',
    'DESCRIPTION:Scholarship deadline is tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsString;
};

/**
 * Helper to download the generated ICS file
 */
export const downloadICS = (title, details, deadlineDate) => {
  const icsString = generateICSFile(title, details, deadlineDate);
  if (!icsString) return;

  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Create safe filename
  const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_deadline.ics`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
