export const formatTimeDifference = (commentCreatedAt) => {
    const now = new Date();
    const commentDate = new Date(commentCreatedAt); // Assuming commentCreatedAt is a valid date string

    const differenceInMilliseconds = now.getTime() - commentDate.getTime();
    const secondsInADay = 86400000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

    const years = Math.floor(differenceInMilliseconds / (secondsInADay * 365));
    const remainingMillisecondsAfterYears = differenceInMilliseconds % (secondsInADay * 365);

    const months = Math.floor(remainingMillisecondsAfterYears / (secondsInADay * 30));
    const days = Math.floor(remainingMillisecondsAfterYears / secondsInADay); // Calculate days directly

    let formattedDifference = '';
    if (years >= 1) {
        formattedDifference += `${years} year${years > 1 ? 's' : ''}`; // Display year if >= 1
    } else if (months > 1) {
        formattedDifference += `${months} month${months > 1 ? 's' : ''}`; // Display months if > 1
    } else if (days > 0 && days < 30) {
        formattedDifference += `${days} day${days > 1 ? 's' : ''}`; // Display days if less than 30
    } else {
        formattedDifference = 'Just now';
    }

    return formattedDifference;
};
