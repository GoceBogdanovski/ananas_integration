const addYears = (date, years) => {
    date.setFullYear(date.getFullYear() + years);
    return date;
}
const formatDate = (dateTimeInput) => { 
    return `${('0' + dateTimeInput.getDate()).slice(-2)}/${('0' + (dateTimeInput.getMonth() + 1)).slice(-2)}/${dateTimeInput.getFullYear()}` 
};
const discountsStartDate = new Date(2023, 8, 1, 0, 0, 0);
const discountsEndDate = addYears(new Date(2023, 8, 1, 0, 0, 0), 10);

module.exports = {
    clientId: "YOUR_ID_HERE",
    clientSecret: "YOUR_SECRET_HERE",
    apiBaseUrl: "https://api.ananas.rs", // DEV: "https://api.stage.ananastest.com" or PROD: "https://api.ananas.rs"
    configType: "PROD", // "DEV" or "PROD"
    discountsStartDate: '01/08/2023', //formatDate(discountsStartDate),
    discountsEndDate: '01/08/2033', //formatDate(discountsEndDate),
};