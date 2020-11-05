function formatOne(date): string {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month.toString().length < 2) {
       month = '0' + month;
    }

    if (day.toString().length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('/');
}

export default {
    dateFormatter: (date, format) => {
        const d = new Date(date);

        switch (format) {
            case 'yyyy/MM/dd':
                return formatOne(d);
                break;
            default:
                return formatOne(d);
        }
    }
};
