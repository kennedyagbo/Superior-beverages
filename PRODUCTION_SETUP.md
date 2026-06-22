# Production Setup Guide - Superior Beverages Website

## Overview
This guide will help you set up the production-ready features including:
- Supabase database for persistent order storage
- Resend email service for order notifications
- Enhanced admin dashboard with real-time updates

---

## 1. Supabase Setup

### 1.1 Create a Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign up or log in
3. Click "New Project"
4. Enter project details:
   - **Name**: Superior Beverages
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 1.2 Get API Keys
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://...`)
   - **anon public** key

### 1.3 Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  product_slug TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT,
  payment_method TEXT DEFAULT 'bank_transfer',
  payment_status TEXT DEFAULT 'pending',
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for order placement)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow public read (needed for order lookup)
CREATE POLICY "Allow public read" ON orders
  FOR SELECT USING (true);

-- Allow public update (needed for transaction ID submission)
CREATE POLICY "Allow public update" ON orders
  FOR UPDATE USING (true);

-- Admin codes table
CREATE TABLE admin_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on admin_codes" ON admin_codes
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on admin_codes" ON admin_codes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete on admin_codes" ON admin_codes
  FOR DELETE USING (true);

-- Enable Realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
```

4. Click "Run" to execute the SQL
5. Verify the tables are created in **Table Editor**

### 1.4 Enable Realtime
1. Go to **Database** → **Replication**
2. Find the `orders` table
3. Toggle **Realtime** to ON

---

## 2. Resend Email Setup

### 2.1 Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2.2 Get API Key
1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it "Superior Beverages Production"
4. Copy the API key (starts with `re_...`)

### 2.3 Add Your Domain (Optional but Recommended)
1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., `superiorbeverages.com`)
3. Follow the DNS verification instructions
4. This improves email deliverability

**Note:** Without domain verification, emails will be sent from `@resend.dev` addresses.

---

## 3. Environment Variables

### 3.1 Create `.env.local` File
In your project root, create a file named `.env.local` with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
RESEND_API_KEY=re_your-api-key-here
COMPANY_EMAIL=orders@superiorbeverages.com
```

**Important:** 
- Replace the placeholder values with your actual keys
- Never commit `.env.local` to version control
- The `.gitignore` file already excludes it

### 3.2 For Vercel Deployment
If deploying to Vercel:
1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add all four variables
4. Deploy your project

---

## 4. Testing the Setup

### 4.1 Test Database Connection
```bash
npm run dev
```
1. Visit `http://localhost:3000/products`
2. Select a product and fill out the order form
3. Submit the order
4. Check your Supabase dashboard → **Table Editor** → `orders` table
5. Verify the order was saved

### 4.2 Test Email Notifications
1. Place a test order (as above)
2. Check the terminal for email logs
3. Check your company email inbox
4. Check the customer email inbox (use a real email in the test)

**Troubleshooting:**
- If emails don't send, check the Resend dashboard for delivery logs
- Verify your API key is correct
- Check spam/junk folders

### 4.3 Test Admin Dashboard
1. Visit `http://localhost:3000/admin`
2. Login with password: `SB@Admin2024`
3. Verify orders appear in the dashboard
4. Test changing order status
5. Test CSV export
6. Test order deletion

---

## 5. Production Deployment

### 5.1 Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 5.2 Post-Deployment Checklist
- [ ] Set up Supabase project and run SQL schema
- [ ] Configure Supabase environment variables in Vercel
- [ ] Verify Resend API key and domain
- [ ] Test order placement end-to-end
- [ ] Verify email notifications are received
- [ ] Test admin dashboard real-time updates
- [ ] Test on multiple devices (phone, tablet, desktop)
- [ ] Test all screen sizes from 320px to 1920px
- [ ] Verify no horizontal scrolling
- [ ] Test form validation and error handling
- [ ] Verify custom cursor is completely removed
- [ ] Test checkout flow on mobile devices

---

## 6. Features Implemented

### ✅ Removed
- Custom cursor completely removed
- All `data-cursor-text` attributes removed
- Custom cursor CSS removed

### ✅ Mobile Responsiveness
- Touch-friendly buttons (minimum 44×44px)
- Responsive font sizes using `clamp()`
- Mobile menu with body scroll lock
- Optimized layouts for all screen sizes (320px - 1920px)
- No horizontal scrolling
- Responsive images with lazy loading

### ✅ Order System
- Supabase PostgreSQL database for persistent storage
- Real-time order updates in admin dashboard
- Duplicate order prevention
- Delivery address collection
- Async order saving with error handling
- Loading states during submission

### ✅ Email Notifications
- Professional HTML email to company on new orders
- Order confirmation email to customer
- Fallback: orders save even if email fails
- Mobile-responsive email templates
- Superior Beverages branding

### ✅ Admin Dashboard
- Real-time order notifications (no page refresh needed)
- 7 order statuses: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Rejected
- Status dropdown for direct selection
- Order deletion with confirmation
- CSV export functionality
- Enhanced stats dashboard
- Search and filter orders

---

## 7. Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify environment variables are set correctly
4. Check Supabase dashboard for database errors
5. Check Resend dashboard for email delivery issues

**Common Issues:**
- **"Missing Supabase environment variables"**: Ensure `.env.local` is properly configured
- **Orders not saving**: Check Supabase table exists and RLS policies are set
- **Emails not sending**: Verify Resend API key and check spam folders
- **Real-time not working**: Ensure Replication is enabled for orders table

---

## 8. Maintenance

### Backup Orders
Supabase automatically backs up your database daily. You can also:
1. Export orders as CSV from the admin dashboard
2. Use Supabase's built-in backup feature

### Monitor Performance
- Supabase dashboard: Monitor database queries
- Resend dashboard: Track email delivery rates
- Vercel dashboard: Monitor site performance and errors

### Updates
Keep dependencies updated:
```bash
npm update
```

---

**Congratulations! Your Superior Beverages website is now production-ready with a fully functional order management system, email notifications, and mobile-responsive design.**
