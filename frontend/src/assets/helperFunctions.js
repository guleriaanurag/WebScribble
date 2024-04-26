export const formatTimeDifference = (commentCreatedAt) => {
    const now = new Date();
    const commentDate = new Date(commentCreatedAt);
    const differenceInMilliseconds = now.getTime() - commentDate.getTime();
    const milliSecondsInADay = 24*60*60*1000;

    const years = Math.floor(differenceInMilliseconds / (milliSecondsInADay * 365));
    const remainingMillisecondsAfterYears = differenceInMilliseconds % (milliSecondsInADay * 365);

    const months = Math.floor(remainingMillisecondsAfterYears / (milliSecondsInADay * 30));
    const days = Math.floor(remainingMillisecondsAfterYears / milliSecondsInADay); // Calculate days directly

    let formattedDifference = '';
    if (years >= 1) {
        formattedDifference += `${years} year${years > 1 ? 's' : ''} ago`; // Display year if >= 1
    } else if (months > 1) {
        formattedDifference += `${months} month${months > 1 ? 's' : ''} ago`; // Display months if > 1
    } else if (days > 0 && days < 30) {
        formattedDifference += `${days} day${days > 1 ? 's' : ''} ago`; // Display days if less than 30
    } else {
        formattedDifference = 'Just now';
    }

    return formattedDifference;
};
