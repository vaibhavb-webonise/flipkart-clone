export const getFirstLetterCapitalName = (name) => {
    if (!name) return ''
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

const convertSingleDigitToDouble = (value) => {
    if (!value) return '00';
    if (value.toString().length === 1) return `0${value}`;
    else return value.toString();
}
export const getTimeLeft = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(12);
    tomorrow.setMinutes(0)
    tomorrow.setSeconds(0)

    let diff = tomorrow.getTime() - today.getTime();
    diff = diff / 1000;
    const diffHours = Math.floor(diff / 3600);
    diff = diff - diffHours * 3600
    const diffMins = Math.floor(diff / 60);
    let diffSec = diff - diffMins * 60;


    return `${convertSingleDigitToDouble(diffHours)}:${convertSingleDigitToDouble(diffMins)}:${convertSingleDigitToDouble(diffSec).toString().slice(0,2)}`;
}
