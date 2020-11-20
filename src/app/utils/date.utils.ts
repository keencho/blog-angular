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

function formatTwo(date): string {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month.toString().length < 2) {
        month = '0' + month;
    }

    if (day.toString().length < 2) {
        day = '0' + day;
    }

    return year + '년 ' + month + '월 ' + day + '일';
}

export default {
    dateFormatter: (date, format) => {
        const d = new Date(date);

        switch (format) {
            case 'yyyy/MM/dd':
                return formatOne(d);
                break;
            case 'yyyy년 MM월 dd일':
                return formatTwo(d);
                break;
            default:
                return formatOne(d);
        }
    }
};
