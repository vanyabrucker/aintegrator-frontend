export interface MeetingTranscriptEntry {
    initial: string;
    name: string;
    time: string;
    text: string;
}

export const MEETING_TRANSCRIPT_DATA: MeetingTranscriptEntry[] = [
    {
        initial: 'L',
        name: 'Laura',
        time: '01:00',
        text: 'Wo stehen wir gerade mit dem Projekt? Ich möchte den aktuellen Stand überprüfen und sehen, ob wir noch im Rahmen des geplanten Zeitplans liegen.'
    },
    {
        initial: 'S',
        name: 'Stephane',
        time: '01:55',
        text: 'Wir sind grösstenteils mit dem ursprünglichen Umfang im Einklang. Die Kernfunktionen sind bereit.'
    }
];
