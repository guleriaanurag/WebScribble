export const formatTimeDifference = (commentCreatedAt, updated) => {
    const now = new Date();
    const commentDate = new Date(commentCreatedAt);
    const differenceInMilliseconds = now.getTime() - commentDate.getTime();
    const milliSecondsInADay = 24 * 60 * 60 * 1000;

    const years = Math.floor(differenceInMilliseconds / (milliSecondsInADay * 365));
    const remainingMillisecondsAfterYears = differenceInMilliseconds % (milliSecondsInADay * 365);

    const months = Math.floor(remainingMillisecondsAfterYears / (milliSecondsInADay * 30));
    const remainingMillisecondsAfterMonths = remainingMillisecondsAfterYears % (milliSecondsInADay * 30);

    const days = Math.floor(remainingMillisecondsAfterMonths / milliSecondsInADay);
    const remainingMillisecondsAfterDays = remainingMillisecondsAfterMonths % milliSecondsInADay;

    const hours = Math.floor(remainingMillisecondsAfterDays / (60 * 60 * 1000));

    let formattedDifference = '';

    if (years >= 1) {
        formattedDifference += `${years} year${years > 1 ? 's' : ''} ago`; // Display year if >= 1
    } else if (months >= 1) {
        formattedDifference += `${months} month${months > 1 ? 's' : ''} ago`; // Display months if >= 1
    } else if (days >= 1) {
        formattedDifference += `${days} day${days > 1 ? 's' : ''} ago`; // Display days if >= 1
    } else if (hours >= 1) {
        formattedDifference += `${hours} hour${hours > 1 ? 's' : ''} ago`; // Display hours if >= 1
    } else {
        formattedDifference = 'Just now';
    }

    if (updated === true) {
        return 'Updated ' + formattedDifference;
    }
    return formattedDifference;
};