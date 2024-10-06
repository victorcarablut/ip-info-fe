import { useEffect, useState } from "react";

export default function DateTime({ timezone }) {

    const [timeZoneDate, setTimeZoneDate] = useState(null);
    const [timeZoneTime, setTimeZoneTime] = useState(null);

    const timeZoneDateTimeLocale = 'en-US';
    // same time, different output based on language
    //'en-US' Expected output: "1:15:30 AM"
    //'it-IT' Expected output: "01:15:30"

    useEffect(() => {
        getTimeZoneDateTime(timeZoneDateTimeLocale, timezone)
        let timer = setInterval(() => getTimeZoneDateTime(timeZoneDateTimeLocale, timezone), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    const getTimeZoneDateTime = async (timeZoneDateTimeLocale, timezone) => {

        const optionsDate = {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }

        const optionsTime = {
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }

        const formatterDate = new Intl.DateTimeFormat(timeZoneDateTimeLocale, optionsDate);
        const formatterTime = new Intl.DateTimeFormat(timeZoneDateTimeLocale, optionsTime);
        setTimeZoneDate(formatterDate.format(new Date()));
        setTimeZoneTime(formatterTime.format(new Date()));
    }

    return (
        <>
            {(timeZoneDate && timeZoneTime) &&
                <>
                    <li><i className="bi bi-calendar-event" /><span>{timeZoneDate}</span></li>
                    <li><i className="bi bi-clock" /><span>{timeZoneTime}</span></li>
                </>
            }
        </>
    )
}

