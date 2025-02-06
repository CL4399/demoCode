function exportXLS(tableBody = [] as any[], tableHead = [] as any[], tableTitle = "导出内容") {
    let thead = tableHead.reduce((total, val: any) => {
        return total += `<th>${val.title}</th>`
    }, `<tr><th>序号</th>`)
    thead += `</tr>`
    let tbody = ''
    tableBody.forEach((body, index) => {
        tbody += `<tr><td>${index + 1}</td>`
        tableHead.forEach((item: any) => {
            tbody += `<td>${body[item.dataIndex]}</td>`
        })
        tbody += `</tr>`
    })
    let excelHtml = `
                    <html>
                        <head>
                            <meta charset='utf-8' />
                            <style>
                            .table {
                                border-collapse: collapse;
                            }
                            .table .title th{
                                height: 60px;
                                font-size: 24px;
                                font-family: '微软雅黑';
                                letter-spacing:2px;
                                font-weight: 700;
                            }
                            .table tr th {
                                height: 50px;
                                color:#005282;
                                background: #ddeaff;
                            }
                            .table tr td {
                                padding: 0 40px;
                                height: 50px;
                                    text-align: center;
                            }
                            </style>
                        </head>
                        <body>
                            <table class="table" border>
                            <tr class="title">
                            <th colspan="${tableHead.length + 1}">${tableTitle}</th>
                        </tr>
                            ${thead}
                            ${tbody}
                            </table>
                        </body>
                        </html>
        `
    let blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel' })
    let url = URL.createObjectURL(blob)
    let oA = document.createElement("a");
    oA.href = url;
    oA.download = `${tableTitle}.xls`;
    document.body.appendChild(oA);
    oA.click();
    document.body.removeChild(oA);
    URL.revokeObjectURL(url)
}





export {
    exportXLS
} 