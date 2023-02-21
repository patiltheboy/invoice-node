// const saleInovoice = ({ data }) => {
//     const today = new Date();

//     // console.log(data)

//     const itemsLength = data.items && data.items.length / 14
//     const isInt = Number(itemsLength) === itemsLength && itemsLength % 1 === 0
//     const countLenth = isInt ? itemsLength : parseInt(itemsLength) + 1
//     const noPrint = [];
//     for (let i = 0; i < countLenth; i++) {
//         noPrint.push(i + 1);
//     }
//     return
//     ` <!doctype html>
//     <html>
//        <head>
//           <meta charset="utf-8">
//           <title>PDF Result Template</title>
//           <style>
//              .invoice-box {
//              max-width: 800px;
//              margin: auto;
//              padding: 30px;
//              border: 1px solid #eee;
//              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
//              font-size: 16px;
//              line-height: 24px;
//              font-family: 'Helvetica Neue', 'Helvetica',
//              color: #555;
//              }
//              .margin-top {
//              margin-top: 50px;
//              }
//              .justify-center {
//              text-align: center;
//              }
//              .invoice-box table {
//              width: 100%;
//              line-height: inherit;
//              text-align: left;
//              }
//              .invoice-box table td {
//              padding: 5px;
//              vertical-align: top;
//              }
//              .invoice-box table tr td:nth-child(2) {
//              text-align: right;
//              }
//              .invoice-box table tr.top table td {
//              padding-bottom: 20px;
//              }
//              .invoice-box table tr.top table td.title {
//              font-size: 45px;
//              line-height: 45px;
//              color: #333;
//              }
//              .invoice-box table tr.information table td {
//              padding-bottom: 40px;
//              }
//              .invoice-box table tr.heading td {
//              background: #eee;
//              border-bottom: 1px solid #ddd;
//              font-weight: bold;
//              }
//              .invoice-box table tr.details td {
//              padding-bottom: 20px;
//              }
//              .invoice-box table tr.item td {
//              border-bottom: 1px solid #eee;
//              }
//              .invoice-box table tr.item.last td {
//              border-bottom: none;
//              }
//              .invoice-box table tr.total td:nth-child(2) {
//              border-top: 2px solid #eee;
//              font-weight: bold;
//              }
//              @media only screen and (max-width: 600px) {
//              .invoice-box table tr.top table td {
//              width: 100%;
//              display: block;
//              text-align: center;
//              }
//              .invoice-box table tr.information table td {
//              width: 100%;
//              display: block;
//              text-align: center;
//              }
//              }
//           </style>
//        </head>
//        <body>
//           <div class="invoice-box">
//              <table cellpadding="0" cellspacing="0">
//                 <tr class="top">
//                    <td colspan="2">
//                       <table>
//                          <tr>
//                             <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
//                                style="width:100%; max-width:156px;"></td>
//                             <td>
//                                Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
//                             </td>
//                          </tr>
//                       </table>
//                    </td>
//                 </tr>
//                 <tr class="information">
//                    <td colspan="2">
//                       <table>
//                          <tr>
//                             <td>
//                                Customer name: ${name}
//                             </td>
//                             <td>
//                                Receipt number: ${receiptId}
//                             </td>
//                          </tr>
//                       </table>
//                    </td>
//                 </tr>
//                 <tr class="heading">
//                    <td>Bought items:</td>
//                    <td>Price</td>
//                 </tr>
//                 <tr class="item">
//                    <td>First item:</td>
//                    <td>${price1}$</td>
//                 </tr>
//                 <tr class="item">
//                    <td>Second item:</td>
//                    <td>${price2}$</td>
//                 </tr>
//              </table>
//              <br />
//              <h1 class="justify-center">Total price: ${parseInt(price1) + parseInt(price2)}$</h1>
//           </div>
//        </body>
//     </html>`;

// };

// module.exports = saleInovoice

const QRCode = require('qrcode')

exports.saleInovoice = ({ data }) => {
  const today = new Date();
  const itemsLength = data.items && data.items.length / 14
  const isInt = Number(itemsLength) === itemsLength && itemsLength % 1 === 0
  const countLenth = isInt ? itemsLength : parseInt(itemsLength) + 1
  const noPrint = [];
  for (let i = 0; i < countLenth; i++) {
    noPrint.push(i + 1);
  }
  
  let qrcode =  ''
//    QRCode.toDataURL("https://dealer.wallicon.in/store", function (err, code) {
//     if(err) return console.log("error occurred")
//     // Printing the code
//     // console.log(code);
//     qrcode.push(code)
// })

QRCode.toString(data.adminInfo.website, {
  errorCorrectionLevel: 'H',
  type: 'svg'
}, function(err, data) {
  if (err) throw err;
  qrcode=data;
});

function transform(value) {

  if (value) {
      var a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
      var b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
      let number = parseFloat(value).toFixed(2).split(".")
      let num = parseInt(number[0]);
      let digit = parseInt(number[1]);
      if (num) {
          if ((num.toString()).length > 9) { return ''; }
          const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          const d = ('00' + digit).substr(-2).match(/^(\d{2})$/);
          if (!n) { return ''; }
          let str = '';
          str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
          str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
          str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
          str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
          str += (Number(n[5]) !== 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupee ' : '';
          str += (Number(d[1]) !== 0) ? ((str !== '') ? "and " : '') + (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]) + 'Paise Only' : 'Only';
          return "INR " + str;
      } else {
          return '';
      }
  } else {
      return '';
  }
}
var Inwords = transform(data.totalAmount ? data.totalAmount : 0)

// function findTotal({qty}){
//   var arr = qty;
//   var scale = document.getElementsByName('num');
//   var tot = 0;
//   for(var i=0;i<arr.length;i++){
//       if(arr[i].value != "" && scale[i].value != ""){
//           tot += parseInt(scale[i].value) * parseInt(arr[i].value);
//       }
//   }
//   document.getElementById('total').value = tot;
// }

let items= data.items
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  
    <style>
      body:{
        font-family:'system-ui';
      }
    </style>
  </head>
  
  <body>
    <div>
    ${noPrint.map((obj, idx) =>
      `<div key={idx} style="background: #fff; width: 100% ; display: flex; justify-content: center; font-family:system-ui">
     
      <div style="background: #fff; height: 20cm; width: 13.7cm; position: relative; margin: 10px 15px;">
      ${idx> 0 ?`<div style= 'padding-top: 15px' />`: ''}
          <h1
            style="font-size: 16px; position: absolute; width: 13.7cm; text-align: center; text-decoration: underline; margin-bottom: 0px">
            Sales Order</h1>
          <div style="font-size: 14px">
            <img src="https://wallicon.in/assets/images/wallicon_logo.png" alt="wallicon"
              style="width: 42px; height: 30px; object-fit: cover" />
              ${noPrint.length > 1 ? `<div style="float: right; margin-top: 15px;" }}>Page ${idx + 1 + "/" + noPrint.length}</div>` : ''}
          </div>
  
          <table style="border-collapse: collapse; border: 1px solid #000; width: 100%; font-size: 12px;">
            <tbody style="border-collapse: collapse; border: 1px solid;">
              <tr style="border: 1px solid #000;">
                <td rowSpan="2" style="border: 1px solid #000;">
                  <b>${data.adminInfo.storeName}</b>
                  <div>${data.adminInfo.street +' '+data.adminInfo.city+' '+data.adminInfo.pincode}</div>
                  <div>State: ${data.adminInfo.state}</div>
                  <div>Contact: ${data.adminInfo.mobile}</div>
                  <div>GSTUIN: <b>${data.adminInfo.gstuin}</b></div>
                </td>
                <td style="border: 1px solid #000; font-size: 12px;">
                  <b>Order Id</b>
                  <div>${data.orderId}</div>
                </td>
                <td style="border: 1px solid #000; font-size: 12px;">
                  <b>Dated</b>
                  <div>${data.orderDate}</div>
                </td>
              </tr> 
              <tr>
                <td rowSpan="3" colSpan="2">
                  <div style="border-left: 1px solid #000; height: 75vh; margin-left: -2px; "> 
                  <div style="text-align: center; font-weight: bold;">Scan Now To Check Our Catalogue</div>
                 <div style="max-height: 200px;  text-align: center;"> ${qrcode} </div>           
                  </div>
                </td>
              </tr>
              <tr style="border: 1px solid #000;">
                <td style="border: 1px solid #000;">
                 <div> Sale To: </div>
                 <b>${data.dealerInfo.storeName}</b>
                 <div>${data.dealerInfo.street +' '+data.dealerInfo.city+' '+data.dealerInfo.pincode}</div>
                 <div>State: ${data.dealerInfo.state}</div>
                 <div>Contact: ${data.dealerInfo.mobile}</div>
                 <div>GSTUIN: <b>${data.dealerInfo.gstuin}</b></div>
                </td>
              </tr>
              <tr style="border: 1px solid #000;">
                <td style="border: 1px solid #000;">
                <div> Ship To: </div> 
                <b>${data.shippingInfo.name ? data.shippingInfo.name : ''}</b>
                <div>${data.shippingInfo.street +' '+data.shippingInfo.city+' '+data.shippingInfo.pincode}</div>
                <div>State: ${data.shippingInfo.state ? data.shippingInfo.state : ""}</div>
                <div>Contact: ${data.shippingInfo.mobile ? data.shippingInfo.mobile : ""}</div>
                </td>
              </tr>
            </tbody>
          </table>
  
          <table style="border-collapse: collapse; border-top: 0; margin: auto; width: 100%; height: 250px">
            <thead>
              <tr style="font-size: 12px; text-align: center; border-top: 0;">
                <td style="border: 1px solid; width: 4%; border-top: 0;">Sl.No.</td>
                <td style="border: 1px solid; border-top: 0;">Description of Items</td>
                <td style="border: 1px solid; width: 6%; border-top: 0;">Qty</td>
                <td style="border: 1px solid; width: 11%; border-top: 0;">Rate</td>
                <td style="border: 1px solid; width: 11%; border-top: 0;">Per</td>
                <td style="border: 1px solid; width: 14%; border-top: 0;">Amount</td>
              </tr>
            </thead>
            <tbody>
            ${ items.slice(idx * 14, 14 * obj).map((item, index) =>
              `<tr key={index} style="font-size: 12px; font-weight: 500; color: #000000; margin: 0px; height: 10px; line-height: 1.2;">
                <td style="text-align: center; border-left: 1px solid">${(idx * 14) + (1 + index)}</td>
                <td style="text-align: left; border-left: 1px solid"><b>${item.itemNo + ' ' +(item.product_name?item.product_name : '')}</b></td>
                <td style="text-align: right; border-left: 1px solid; border-right: 1px solid"><b>${item.qty}</b></td>
                <td style="text-align: right; border-left: 1px solid; border-right: 1px solid">${parseFloat(item.price).toLocaleString("en-IN", { style: "currency", currency: "INR" }).slice(1)}</td>
                <td style="text-align: left; border-left: 1px solid; border-right: 1px solid">${item.unit ? item.unit : ''}</td>
                <td style="text-align: right; border-left: 1px solid; border-right: 1px solid; padding-right: 4px">
                  <b>${(parseFloat(item.price) * parseFloat(item.qty)).toLocaleString("en-IN", { style: "currency", currency: "INR" }).slice(1)}</b></td>
              </tr>`
            ).join('')}
  
              <tr style="border-bottom: 1px solid; border-left: 1px solid; border-right: 1px solid">
                <th style="padding-top: ""></th>
                <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
                <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
                <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
                <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
                <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
              </tr>
  ${idx === countLenth - 1 ?
             ` <tr style="font-size: 10px; font-weight: 500; color: #000000; margin: 0px; height: 10px">
                <td style="border: 1px solid"></td>
                <td style="border: 1px solid; text-align: right; font-size: 14px; font-weight: bold">Total</td>
                <td style="border: 1px solid; font-size: 14px; text-align: right;"><b>${data.qty}</b></td>
                <td style="border: 1px solid;"></td>
                <td style="border: 1px solid;"></td>
                <td style="border: 1px solid; font-size: 14px; text-align: right">
                <b>${data.totalAmount ? data.totalAmount.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : 0}</b>
                </td>
              </tr>`
              : ''
              }
            </tbody>
          </table>
  
          ${idx !== countLenth - 1 ?
            `<table style="font-size: 12px; border-collapse: collapse; border: 1px solid; border-top: 0; width: 100%">
              <tbody>
                <tr style="height: 180px; text-align: right; vertical-align: text-top; ">
                  <td style="padding-top: 20px; padding-right: 10px; ">
                      continued...
                  </td>
                </tr>
              </tbody>
            </table>`
            :
          `<table style="font-size: 12px; border-collapse: collapse; border: 1px solid; border-top: 0; width: 100%">
        <tbody >
        <tr>
        <td  style="border: 0; ">
          Amount Chargeable (in words)</div>    <br/> 
          <b>${Inwords}</b>            
        </td>
        <td style="border: 0; text-align: right; border-right: 1px solid; vertical-align: text-top;"> E & O.E </td>
      </tr>
      <tr>
      <td style="padding-top: 90px">
      </td>
      <td style="padding-top: 90px">
      </td>
    </tr>
          <tr style="margin-top:1000px">
            <td style="vertical-align: text-top; ">
              <b><u>Declaration:</u></b>
              ${data.cartType === "Partner Cart" ?
              `<div>
                These items should be billed & shipped
                by our partnered company
              </div>`
              :""
            }
            </td>
            <td style=" text-align:right; border-left: 1px solid; border-top: 1px solid; border-bottom: 0; border-right:1px solid">
               <div style="font-weight: bold; margin-bottom: 10px;">
                  For Wallicon Private Limited
                </div>
                <div>Authorised Signatory</div>
            </td>
          </tr>
        </tbody>
        </table>`
          }
        <div style="font-size: 12px; text-align: center">THIS IS A COMPUTER GENERATED SALE ORDER.</div>
      </div>
    </div>`
            ).join('')}
    </div>
  </body>
  </html>
  `;
};


{/* <tr >
            <td rowSpan="2" colSpan="4" style="width:50%; border: 0; padding-top: 20px;">
              <b>Declaration:</b>
              <div>These items should be billed & shipped
                by our partnered company</div>
            </td>
            <td style="width:50%; border-right: 1px solid; border: 0; border-right: 1px solid; padding-top: 20px;">
              <b>Company's Bank Details</b>
              <div>Bank Name: ICICI BANK</div>
              <div>A/c No.: 777705555807</div>
              <div>Branch & IFC Code: Aminabad & ICIC0001033</div>
              <div>UPI ID: MYBANK@BAK9875</div>
            </td>
          </tr>
          <tr style="border-left: 1px solid;">
            <td style="text-align:right; border-left: 1px solid; border-top: 1px solid; border-bottom: 0; border-right:1px solid">
              <div style="border-left:1px solid; margin-left: -2px">
              <div style="font-weight: bold; margin-bottom: 10px;">For Wallicon Private Limited</div>
             
              <div>Authorised Signatory</div>
              </div>
            </td>
          </tr> */}
        
// exports.saleInovoice = ({ data }) => {
//   const today = new Date();
//   const itemsLength = data.order.items && data.order.items.length / 14
//   const isInt = Number(itemsLength) === itemsLength && itemsLength % 1 === 0
//   const countLenth = isInt ? itemsLength : parseInt(itemsLength) + 1
//   const noPrint = [];
//   for (let i = 0; i < countLenth; i++) {
//     noPrint.push(i + 1);
//   }
//   return `
//   <!DOCTYPE html>
//   <html lang="en">
  
//   <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
  
//     <style>
//       body:{
//         font-family:'system-ui';
//       }
//     </style>
//   </head>
  
//   <body>
//     <div>
//       <div key={idx} style="background: #fff; width: 100% ; display: flex; justify-content: center; font-family:system-ui">
//         <div style="background: #fff; height: 20cm; width: 13.7cm; position: relative; margin: 15px">
//           <h1
//             style="font-size: 16px; position: absolute; width: 13.7cm; text-align: center; text-decoration: underline; margin-bottom: 0px">
//             Sales Order</h1>
//           <div style="font-size: 14px">
//             <img src="https://wallicon.in/assets/images/wallicon_logo.png" alt="wallicon"
//               style="width: 42px; height: 30px; object-fit: cover" />
//           </div>
  
//           <table style="border-collapse: collapse; border: 1px solid #000; width: 100%; font-size: 12px;">
//             <tbody style="border-collapse: collapse; border: 1px solid;">
//               <tr style="border: 1px solid #000;">
//                 <td rowSpan="2" style="border: 1px solid #000;">
//                   <b>Wallicon Private Limited</b>
//                   <div>Address</div>
//                   <div>State: </div>
//                   <div>Contact: </div>
//                   <div>GSTUIN: <b>U32</b></div>
//                 </td>
//                 <td style="border: 1px solid #000; font-size: 12px;">
//                   <b>Order Id</b>
//                   <div>101</div>
//                 </td>
//                 <td style="border: 1px solid #000; font-size: 12px;">
//                   <b>Dated</b>
//                   <div>23-Nov-2022</div>
//                 </td>
//               </tr> 
  
//               <tr>
//                 <td rowSpan="3" colSpan="2">
//                   <div style="border-left: 1px solid #000; height: 75vh; margin-left: -2px; "> 
//                   <div style="text-align: center; font-weight: bold;">Scan Now To Check Our Catalogue</div>
//                   </div>
//                 </td>
//               </tr>
//               <tr style="border: 1px solid #000;">
//                 <td style="border: 1px solid #000;">
//                  <div> Sale To: </div>
//                   <b>Wallicon Private Limited</b>
//                   <div>Address</div>
//                   <div>State: </div>
//                   <div>Contact: </div>
//                   <div>GSTUIN: <b>U32</b></div>
//                 </td>
//               </tr>
//               <tr style="border: 1px solid #000;">
//                 <td style="border: 1px solid #000;">
//                 <div> Ship To: </div> 
//                 <b>Wallicon Private Limited</b>
//                   <div>Address</div>
//                   <div>State: </div>
//                   <div>Contact: </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
  
//           <table style="border-collapse: collapse; border-top: 0; margin: auto; width: 100%; height: 250px">
//             <thead>
//               <tr style="font-size: 12px; text-align: center; border-top: 0;">
//                 <td style="border: 1px solid; width: 4%; border-top: 0;">Sl.No.</td>
//                 <td style="border: 1px solid; border-top: 0;">Description of Items</td>
//                 <td style="border: 1px solid; width: 11%; border-top: 0;">Quantity</td>
//                 <td style="border: 1px solid; width: 11%; border-top: 0;">Rate</td>
//                 <td style="border: 1px solid; width: 6%; border-top: 0;">Per</td>
//                 <td style="border: 1px solid; width: 14%; border-top: 0;">Amount</td>
//               </tr>
//             </thead>
//             <tbody>
//               <tr key={index} style="font-size: 12px; font-weight: 500; color: #000000; margin: 0px; height: 10px">
//                 <td style="text-align: center; border-left: 1px solid"></td>
//                 <td style="text-align: left; border-left: 1px solid"><b></b></td>
//                 <td style="text-align: center; border-left: 1px solid; border-right: 1px solid"><b>3.00 roll</b></td>
//                 <td style="text-align: center; border-left: 1px solid; border-right: 1px solid">508.47</td>
//                 <td style="text-align: center; border-left: 1px solid; border-right: 1px solid">roll</td>
//                 <td style="text-align: right; border-left: 1px solid; border-right: 1px solid; padding-right: 4px">
//                   <b>1,525.41</b></td>
//               </tr>
  
//               <tr style="border-bottom: none; border-left: 1px solid; border-right: 1px solid">
//                 <th style="padding-top: ''"></th>
//                 <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                 <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                 <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                 <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                 <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//               </tr>
  
//               <tr style="font-size: 10px; font-weight: 500; color: #000000; margin: 0px; height: 10px">
//                 <td style="border: 1px solid"></td>
//                 <td style="border: 1px solid; text-align: right; font-size: 14px; font-weight: bold">Total</td>
//                 <td style="border: 1px solid"></td>
//                 <td style="border: 1px solid"></td>
//                 <td style="border: 1px solid"></td>
//                 <td style="border: 1px solid; font-size: 14px; text-align: right"><b>3,810.00</b></td>
//               </tr>
//             </tbody>
//           </table>
  
  
//           <table style="font-size: 12px; border-collapse: collapse; border: 1px solid; border-top: 0; width: 100%">
//             <thead>
//               <tr>
//                 <td colSpan="4" style="border: 0; ">
//                 <div>Amount Chargeable (in words)</div>                  
//                 </td>
//                 <td style="border: 0; text-align: right; border-right: 1px solid;"> E & O.E </td>
//               </tr>
//               <tr>
//               <td colSpan="6" style="border: 0; border-right: 1px solid; font-size: 10px">
//               <b>INR THREE THOUSAND EIGHT HUNDRED TEN ONLY</b>
//               </td>
//               </tr>
//         </thead>
//         <tbody >
//           <tr >
//             <td rowSpan="2" colSpan="4" style="width:50%; border: 0; padding-top: 30px;">
//               <b>Declaration:</b>
//               <div>These items should be billed & shipped
//                 by our partnered company</div>
//             </td>
//             <td style="width:50%; border-right: 1px solid; border: 0; border-right: 1px solid; padding-top: 30px;">
//               <b>Company's Bank Details</b>
//               <div>Bank Name: ICICI BANK</div>
//               <div>A/c No.: 777705555807</div>
//               <div>Branch & IFC Code: Aminabad & ICIC0001033</div>
//               <div>UPI ID: MYBANK@BAK9875</div>
//             </td>
//           </tr>
//           <tr style="border-left: 1px solid;">
//             <td style="text-align:right; border-left: 1px solid; border-top: 1px solid; border-bottom: 0; border-right:1px solid">
//               <div style="border-left:1px solid; margin-left: -2px">
//               <div style="font-weight: bold; margin-bottom: 10px;">For Wallicon Private Limited</div>
             
//               <div>Authorised Signatory</div>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//         </table>
  
//         <div style="font-size: 12px; text-align: center">THIS IS A COMPUTER GENERATED SALE ORDER.</div>
//       </div>
//     </div>
//     </div>
//   </body>
  
//   </html>
//     `;
// };

//   return `
//    <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>

//     <style>
//       table, th, td {
//       border: 1px solid black;
//       border-collapse: collapse;
//       }
// </style>
// </head>
// <body>
//     <div>
//         <div
//          key={idx}
//           style="background: #fff; width: 100% ; display: flex; justify-content: center; ">
//           <div style="background: #fff; height: 20cm; width: 13.7cm; position: relative; margin: 15px">
//             <h1 style="font-size: 16px; position: absolute; width: 13.7cm; text-align: center; text-decoration: underline; margin-bottom: 0px">Sales Order</h1>
//             <div style="font-size: 14px">
//               <img src="https://wallicon.in/assets/images/wallicon_logo.png" alt="wallicon"
//                 style="width: 42px; height: 30px; object-fit: cover" />
//             </div>
            
//             <table style="border-collapse: collapse; border: 1px solid #000; width: 100%; font-size: 12px;">
//           <tbody style="border-collapse: collapse; border: 1px solid;">
//             <tr style="border: 1px solid #000;">
//               <td rowSpan="2" style="border: 1px solid #000;">
//                 <b>Wallicon Private Limited</b>
//                 <div>Address</div>
//                 <div>State: </div>
//                 <div>Contact: </div>
//                 <div>Email: </div>
//                 <div>GSTUIN: <b>U32</b></div>
//               </td>
//               <td style="border: 1px solid #000; font-size: 12px;">
//                 <b>Order Id</b>
//                 <div>101</div>
//               </td>
//               <td style="border: 1px solid #000; font-size: 12px;">
//                 <b>Dated</b>
//                 <div>23-Nov-2022</div>
//               </td>
//             </tr>
            
        

//             <tr style="border: 1px solid #000;">
//               <td  style="border: 1px solid #000;" rowSpan="3" colSpan="2">
//                 <div>Sale To:</div>
//                 <b>Wallicon Private Limited</b>
//                 <div>Address</div>
//                 <div>State: </div>
//                 <div>Contact: </div>
//                 <div>Email: </div>
//               </td>
//             </tr>
//             <tr style="border: 1px solid #000;">
//               <td  style="border: 1px solid; #000">
//                 <div>Ship To:</div>
//                 <b>Wallicon Private Limited</b>
//                 <div>Address</div>
//                 <div>State: </div>
//                 <div>Contact: </div>
//                 <div>Email: </div>
//               </td>
//             </tr>
//             <tr style="border: 1px solid; #000">
//               <td  style="border: 1px solid; #000">
//                 <div>Ship To:</div>
//                 <b>Wallicon Private Limited</b>
//                 <div>Address</div>
//                 <div>State: </div>
//                 <div>Contact: </div>
//                 <div>Email: </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
        
//             <table style="border-collapse: collapse; margin: auto; width: 100%; height: 250px">
//               <thead>
//                 <tr style="font-size: 12px; text-align: center">
//                   <td style="border: 1px solid; width: 4%">Sl.No.</td>
//                   <td style="border: 1px solid">Description of Items</td>
//                   <td style="border: 1px solid; width: 11%">Quantity</td>
//                   <td style="border: 1px solid; width: 11%">Rate</td>
//                   <td style="border: 1px solid; width: 6%">Per</td>
//                   <td style="border: 1px solid; width: 14%">Amount</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr
//                 key={index}
//                   style="font-size: 12px; font-weight: 500; color: #000000; margin: 0px; height: 10px">
//                   <td style="text-align: center; border-left: 1px solid"></td>
//                   <td style="text-align: left; border-left: 1px solid"><b></b></td>
//                   <td style="text-align: center; border-left: 1px solid; border-right: 1px solid"><b>3.00 roll</b></td>
//                   <td style="text-align: center; border-left: 1px solid; border-right: 1px solid">508.47</td>
//                   <td style="text-align: center; border-left: 1px solid; border-right: 1px solid">roll</td>
//                   <td style="text-align: right; border-left: 1px solid; border-right: 1px solid; padding-right: 4px"><b>1,525.41</b></td>
//                 </tr>
  
//                 <tr style="border-bottom: none; border-left: 1px solid; border-right: 1px solid">
//                   <th style="padding-top: ''"></th>
//                   <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                   <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                   <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                   <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                   <th style="border-bottom: none; border-left: 1px solid; border-right: 1px solid"></th>
//                 </tr>
  
//                 <tr style="font-size: 10px; font-weight: 500; color: #000000; margin: 0px; height: 10px">
//                   <td style="border: 1px solid"></td>
//                   <td style="border: 1px solid; text-align: right; font-size: 14px"><b>Total</b></td>
//                   <td style="border: 1px solid"></td>
//                   <td style="border: 1px solid"></td>
//                   <td style="border: 1px solid"></td>
//                   <td style="border: 1px solid; font-size: 14px; text-align: right"><b>3,810.00</b></td>
//                 </tr>
//               </tbody>
//             </table>
  
//             <div style="border: 1px solid; border-top: none; min-height: 170px">
//                 <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 0 4px">
//                   <span style="font-size: 12px">
//                     Amount Chargeable (in words)
//                   </span>
//                   <span style="font-size: 12px">
//                     E. & O.E
//                   </span>
//                 </div>
//                 <h6 style="margin: 0; padding: 0 4px">INR THREE THOUSAND EIGHT HUNDRED TEN ONLY</h6>
//                 <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 12px">
//                   <div style="width: 50%; padding-left: 3px; height: 130px; position: relative">
  
//                     <div style="position: absolute; bottom: 10px">Declaration: <br />
//                       <b style="font-size: 12px">These items should be billed & shipped
//                         by our partnered company</b>
//                     </div>
//                   </div>
  
//                   <div style="width: 50%; display: flex; flex-direction: column">
  
//                     <div style="font-size: 12px; display: flex; flex-direction: column; padding-left: 3px; min-height: 80px">
//                         <div style="font-size: 12px; font-weight: 600">Company's Bank Details</div>
//                         <div>
//                             <span style="font-size: 12px; font-weight: 600">Bank Name:</span>
//                             <span style="font-size: 11px; font-weight: bold">&nbsp;ICICI BANK</span>
//                         </div>
//                         <div>
//                             <span style="font-size: 12px; font-weight: 600">A/c No.:</span>
//                             <span style="font-size: 11px; font-weight: bold">&nbsp;777705555807</span>
//                         </div>
//                         <div>
//                             <span style="font-size: 10px; font-weight: 600">Branch & IFC Code:</span>
//                             <span style="font-size: 11px; font-weight: bold">&nbsp;Aminabad & ICIC0001033</span>
//                         </div>
//                         <div>
//                             <span style="font-size: 12px; font-weight: 600">UPI ID:</span>
//                             <span style="font-size: 11px; font-weight: bold">&nbsp;MYBANK@BAK9875</span>
//                         </div>
//                     </div>
  
//                     <div style="border-left: 1px solid; border-top: 1px solid; height: 100%; display: flex; flex-direction: column">
//                       <div style="text-align: right; font-size: 12px; font-weight: bold; padding-right: 3px">For Wallicon Private Limited</div>
//                       <div style="height: 100%; display: flex; justify-content: right; align-items: end; font-size: 13px; padding-right: 3px">Authorised Signatory</div>
//                     </div>
  
//                   </div>
//                 </div>
            
//             <!-- <div style="text-align: right; padding-right: 4px; font-size: 12px">continued... </div>  -->
    
//             </div>
//             <div style="font-size: 12px; text-align: center">THIS IS A COMPUTER GENERATED SALE ORDER.</div>
  
//           </div>
//         </div>
//       </div>
// </body>
// </html>
//     `;
// };