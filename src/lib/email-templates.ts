export function generateCompanyEmailHtml(order: any): string {
  const orderDate = new Date(order.createdAt).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B2A4A 0%, #722F37 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Superior Beverages</h1>
              <p style="margin: 8px 0 0; color: #C9A84C; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">New Order Notification</p>
            </td>
          </tr>
          
          <!-- Order Info -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px; color: #2A2520; font-size: 22px;">New Order Received</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Order ID:</strong>
                    <span style="color: #2A2520; font-family: monospace; margin-left: 10px;">${order.id}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Date:</strong>
                    <span style="color: #2A2520; margin-left: 10px;">${orderDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Status:</strong>
                    <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 10px;">Pending</span>
                  </td>
                </tr>
              </table>
              
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Customer Information</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; color: #2A2520;">${order.customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; color: #2A2520;">${order.customerEmail}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; color: #2A2520;">${order.customerPhone}</td>
                </tr>
                ${order.deliveryAddress ? `
                <tr>
                  <td style="padding: 12px 20px;"><strong>Address:</strong></td>
                  <td style="padding: 12px 20px; color: #2A2520;">${order.deliveryAddress}</td>
                </tr>
                ` : ''}
              </table>
              
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Order Details</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                <tr style="background-color: #722F37; color: #ffffff;">
                  <th style="padding: 12px 20px; text-align: left;">Product</th>
                  <th style="padding: 12px 20px; text-align: center;">Qty</th>
                  <th style="padding: 12px 20px; text-align: right;">Total</th>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0;">${order.productName}</td>
                  <td style="padding: 12px 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">${order.quantity}</td>
                  <td style="padding: 12px 20px; text-align: right; border-bottom: 1px solid #e0e0e0; font-weight: bold;">₦${order.totalPrice.toLocaleString()}.00</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td colspan="2" style="padding: 12px 20px; text-align: right;"><strong>Grand Total:</strong></td>
                  <td style="padding: 12px 20px; text-align: right; font-size: 18px; font-weight: bold; color: #722F37;">₦${order.totalPrice.toLocaleString()}.00</td>
                </tr>
              </table>
              
              ${order.transactionId ? `
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Payment Information</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px;">
                <tr>
                  <td>
                    <strong>Payment Method:</strong> Bank Transfer<br>
                    <strong>Transaction ID:</strong> <span style="font-family: monospace;">${order.transactionId}</span>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #9A9590; font-size: 12px;">
                This is an automated notification from Superior Beverages Order Management System.
              </p>
              <p style="margin: 0; color: #9A9590; font-size: 12px;">
                Please log in to your admin dashboard to manage this order.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateCustomerEmailHtml(order: any): string {
  const orderDate = new Date(order.createdAt).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B2A4A 0%, #722F37 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Superior Beverages</h1>
              <p style="margin: 8px 0 0; color: #C9A84C; font-size: 14px;">Thank You for Your Order!</p>
            </td>
          </tr>
          
          <!-- Thank You Message -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 15px; color: #2A2520; font-size: 22px;">Dear ${order.customerName},</h2>
              <p style="margin: 0 0 20px; color: #4A4540; line-height: 1.6; font-size: 15px;">
                Thank you for choosing Superior Beverages! Your order has been successfully received and is being processed. We appreciate your business and will ensure your order is handled with the utmost care.
              </p>
              
              <!-- Order Summary -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Order Reference:</strong>
                    <span style="color: #2A2520; font-family: monospace; margin-left: 10px; font-weight: bold;">${order.id}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Order Date:</strong>
                    <span style="color: #2A2520; margin-left: 10px;">${orderDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Total Amount:</strong>
                    <span style="color: #722F37; margin-left: 10px; font-size: 18px; font-weight: bold;">₦${order.totalPrice.toLocaleString()}.00</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #722F37;">Status:</strong>
                    <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 10px;">Pending Verification</span>
                  </td>
                </tr>
              </table>
              
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Order Summary</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                <tr style="background-color: #722F37; color: #ffffff;">
                  <th style="padding: 12px 20px; text-align: left;">Product</th>
                  <th style="padding: 12px 20px; text-align: center;">Quantity</th>
                  <th style="padding: 12px 20px; text-align: right;">Amount</th>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0;">${order.productName}</td>
                  <td style="padding: 12px 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">${order.quantity}</td>
                  <td style="padding: 12px 20px; text-align: right; border-bottom: 1px solid #e0e0e0; font-weight: bold;">₦${order.totalPrice.toLocaleString()}.00</td>
                </tr>
              </table>
              
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">What Happens Next?</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f8ff; border-left: 4px solid #C9A84C; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="color: #4A4540; line-height: 1.8; font-size: 14px;">
                    <strong>1.</strong> Our team will verify your payment within 24 hours<br>
                    <strong>2.</strong> You will receive a confirmation call or email once verified<br>
                    <strong>3.</strong> Your order will be prepared and dispatched<br>
                    <strong>4.</strong> You will receive tracking information once shipped
                  </td>
                </tr>
              </table>
              
              ${order.deliveryAddress ? `
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Delivery Address</h3>
              <p style="margin: 0; color: #4A4540; line-height: 1.6; font-size: 14px;">
                ${order.deliveryAddress}
              </p>
              ` : ''}
              
              <h3 style="margin: 20px 0 15px; color: #2A2520; font-size: 18px;">Need Help?</h3>
              <p style="margin: 0 0 10px; color: #4A4540; line-height: 1.6; font-size: 14px;">
                If you have any questions about your order, please don't hesitate to contact us:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                <tr>
                  <td style="padding: 5px 0; color: #4A4540; font-size: 14px;">
                    <strong>Email:</strong> <a href="mailto:info@superiorbeverages.com" style="color: #722F37; text-decoration: none;">info@superiorbeverages.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #4A4540; font-size: 14px;">
                    <strong>Phone:</strong> +234 123 456 7890
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #4A4540; font-size: 14px;">
                    <strong>WhatsApp:</strong> <a href="https://wa.me/2341234567890" style="color: #722F37; text-decoration: none;">Chat with us</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #9A9590; font-size: 12px;">
                Thank you for choosing Superior Beverages - Nigeria's Premier Beverage Manufacturer
              </p>
              <p style="margin: 0; color: #9A9590; font-size: 12px;">
                © ${new Date().getFullYear()} Superior Beverages Ltd. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
