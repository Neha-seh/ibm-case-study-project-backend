module.exports = ({ project_name, project_industry, country, city, client_name1,
                      client_phone,client_email, project_start_date, project_end_date, problem_space,
                      approach, idea, impact}) => {

    const today = new Date();
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
       <style>
          body {
                overflow-x: hidden;
                font-family: 'Roboto Slab', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            }
            
             .invoice-box {
             max-width: 80%;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             /*font-family: Algerian;*/
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: left;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #666565;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             
             .table-top-section{
             background-color: #6e6f70;
             }
             .item{
             text-align: left;
             }
             
             @media only screen and (max-width: 600px) {
             
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
       <div class="table-responsive">
          <div class="invoice-box">
<!--             <table cellpadding="0" cellspacing="0">-->
              <table class="table table-fixed">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title1"><img  src="data:image/png;base64,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"
                               style="width:200%; max-width:156px;"></td>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table class=
                         <tr>
                            <td>
                               Project name: ${project_name}
                            </td>
                            </tr>
                <tr class="item">
                            <td>
                               Client Name: ${client_name1}
                            </td></tr>
                <tr class="item">
                             <td>
                               Industry: ${project_industry}
                            </td></tr>
                <tr class="item">
                             <td>
                               country: ${country}
                            </td> </tr>
                <tr class="item">
                            <td>
                               city: ${city}
                            </td> </tr>        
                <tr class="item">
                            <td>
                               client_phone: ${client_phone}
                            </td> </tr>
                <tr class="item">
                            <td>
                               client_email: ${client_email}
                            </td> </tr>
                <tr class="item">
                            <td>
                               project_start_date: ${project_start_date}
                            </td></tr>
                <tr class="item">
                            <td>
                               project_end_date: ${project_end_date}
                            </td>
                            
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="item">
                   <td>Problem Space:</td>
                   <td style="text-align:left">${problem_space}</td>
                </tr>
                <tr class="item">
                   <td>Approach:</td>
                   <td style="text-align:left">${approach}</td>
                </tr>
                 <tr class="item">
                   <td>Idea:</td>
                   <td style="text-align:left">${idea}</td>
                </tr>
                <tr class="item">
                   <td>Impact:</td>
                   <td style="text-align:left">${impact}</td>
                </tr>
             </table>
             <br />
            
          </div>
          </div>
    <!-- end od main table division-->
       </body>
    </html>
    `;
};
