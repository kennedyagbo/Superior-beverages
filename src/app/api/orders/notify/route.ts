import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateCompanyEmailHtml, generateCustomerEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'orders@superiorbeverages.com';

export async function POST(request: Request) {
  try {
    const order = await request.json();

    // Validate required fields
    if (!order.id || !order.customerEmail || !order.customerName) {
      return NextResponse.json(
        { error: 'Missing required order fields' },
        { status: 400 }
      );
    }

    // Send email to company (don't fail order if email fails)
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Superior Beverages <orders@superiorbeverages.com>',
          to: [COMPANY_EMAIL],
          subject: `New Order Received: ${order.id}`,
          html: generateCompanyEmailHtml(order),
        });
        console.log(`Company notification email sent for order ${order.id}`);
      } else {
        console.warn('RESEND_API_KEY not configured, skipping company email');
      }
    } catch (emailError) {
      console.error('Failed to send company notification email:', emailError);
      // Don't fail the order if email fails
    }

    // Send confirmation email to customer
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Superior Beverages <orders@superiorbeverages.com>',
          to: [order.customerEmail],
          subject: `Order Confirmation - ${order.id}`,
          html: generateCustomerEmailHtml(order),
        });
        console.log(`Customer confirmation email sent to ${order.customerEmail} for order ${order.id}`);
      } else {
        console.warn('RESEND_API_KEY not configured, skipping customer email');
      }
    } catch (emailError) {
      console.error('Failed to send customer confirmation email:', emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Order notifications processed' 
    });
  } catch (error) {
    console.error('Email notification error:', error);
    // Don't fail the order if email fails
    return NextResponse.json(
      { success: false, error: 'Failed to process email notifications' },
      { status: 500 }
    );
  }
}
