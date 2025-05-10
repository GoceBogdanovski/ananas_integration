const loggerInstance = require('../infrastructure/loggerInstance');
module.exports = {
    log: (input) => {
        loggerInstance.log(input);
    },
    readLogs: (httpRequest, httpResponse) => {
        setImmediate(async () => {            
            const today = new Date();
            const take = httpRequest.query.take || 100;
            const order = httpRequest.query.order || 'desc';
            const fromDate = !isNaN(Date.parse(httpRequest.query.fromDate)) ? new Date(httpRequest.query.fromDate) : new Date(new Date().setDate(new Date().getDate() - 7));
            const toDate = !isNaN(Date.parse(httpRequest.query.toDate)) ? new Date(httpRequest.query.toDate) : today;

            loggerInstance.query({
                order: order,
                limit: take,
                from: fromDate,
                until: toDate
            },
                (err, result) => {
                    if (err) {
                        httpResponse.status(500).send({
                            error: 'Error retrieving logs'
                        }).end();
                    }
                    else {
                        const objLogs = Array.from(result.file);
                        const logsNumber = objLogs.length;
                        let htmlOutput = '<style>html,body{margin:0; padding:10px;}</style>';

                        htmlOutput += `<div style="float: left; width:100%; margin-bottom:10px;">Active filter: take: ${take}, order: ${order}, from date: ${fromDate.toDateString()}, to date: ${toDate.toDateString()}</div>`;

                        htmlOutput += '<div style="float: left; width:100%;"><table border="1" style="width:100%; box-sizing:border-box; border-collapse: collapse;"><thead style="background-color:#eaeaea; font-weight:bold;"><tr><td>#</td><td style="padding:5px">Level</td><td style="padding:5px">Date Time</td><td style="padding:5px">Message</td></tr></thead><tbody>';
                        objLogs.forEach((item, idx) => {
                            const dt = new Date(item.timestamp);
                            const dtFormatted = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'medium', timeZone: 'Europe/Berlin' }).format(dt);
                            htmlOutput += `<tr><td style="padding:5px; width:40px;">${logsNumber - (idx)}</td><td style="padding:5px; width:40px;">${item.level}</td><td style="padding:5px; width:140px;">${dtFormatted}</td><td style="padding:5px"><div style="width:1000px; word-break: break-all;">${item.message}</div></td></tr>`;
                        });
                        htmlOutput += '</tbody></table></div>';
                        httpResponse.send(htmlOutput).end();
                    }
                });
        });
    }
};