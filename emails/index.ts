export const userConfirmationEmail = (booking: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRS Rides Booking Confirmation</title>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #ffffff; background-color: #111827; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1f2937; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;color: #ffffff; }
    .content {  padding: 30px; border-radius: 0 0 10px 10px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;background-color: #374151; }
    h1 { margin-top: 0; color: #f3f4f6; }
    ul { list-style-type: none; padding: 0; }
    li { margin-bottom: 15px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s ease; }
    .button:hover { background-color: #2563eb; }
    .highlight { color: #60a5fa; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TRS Rides</h1>
      <p >Premium Transportation Services in Poland</p>
    </div>
    <div class="content capitalize">
      <h2>Booking Confirmation</h2>
      <p>Thank you for choosing TRS Rides. Your premium ride experience has been confirmed:</p>
      <ul>
        <li><span class="highlight">Service:</span> ${booking.serviceType}</li>
        <li><span class="highlight">Pickup:</span> ${
          booking.pickupLocation
        }</li>
        <li><span class="highlight">Dropoff:</span> ${
          booking.dropoffLocation
        }</li>
        <li><span class="highlight">Date:</span> ${new Date(
          booking.pickupDate
        ).toLocaleDateString()}</li>
        <li><span class="highlight">Time:</span> ${booking.pickupTime}</li>
        <li><span class="highlight">Vehicle:</span> ${
          booking.selectedVehicle
        }</li>
        <li><span class="highlight">Fare:</span> PLN${booking.fare.toFixed(
          2
        )}</li>
      </ul>
      <p>Need to make changes or have questions? We're here to assist you.</p>
    </div>
    <div class="footer">
      <p>TRS Rides | Premium Transportation Services in Poland</p>
      <p>Warsaw, Poland | +48 512 376 189 | info@trsrides.com</p>
      <p>
        <a href="https://www.instagram.com/trs.rides?igsh=OHVibmVzdjljNHFs" style="color: #60a5fa; margin-right: 10px;">Instagram</a>
        <a href="https://www.facebook.com/share/15kM8upLCP/?mibextid=wwXIfr" style="color: #60a5fa;">Facebook</a>
      </p>
      <p>© ${new Date().getFullYear()} TRS Rides. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const adminNotificationEmail = (booking: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New TRS Rides Booking</title>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #ffffff; background-color: #111827; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1f2937; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;color: #ffffff; }
    .content { padding: 30px; border-radius: 0 0 10px 10px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;  background-color: #374151; }
    h1 { margin-top: 0; color: #f3f4f6; }
    ul { list-style-type: none; padding: 0; }
    li { margin-bottom: 15px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s ease; }
    .button:hover { background-color: #2563eb; }
    .highlight { color: #60a5fa; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TRS Rides</h1>
      <p>New Booking Alert</p>
    </div>
    <div class="content capitalize">
      <h2>New Booking Details</h2>
      <p>A new booking has been made. Here are the details:</p>
      <ul>
        <li><span class="highlight">Service:</span> ${booking.serviceType}</li>
        <li><span class="highlight">Pickup:</span> ${
          booking.pickupLocation
        }</li>
        <li><span class="highlight">Dropoff:</span> ${
          booking.dropoffLocation
        }</li>
        <li><span class="highlight">Date:</span> ${new Date(
          booking.pickupDate
        ).toLocaleDateString()}</li>
        <li><span class="highlight">Time:</span> ${booking.pickupTime}</li>
        <li><span class="highlight">Vehicle:</span> ${
          booking.selectedVehicle
        }</li>
        <li><span class="highlight">Fare:</span> PLN${booking.fare.toFixed(
          2
        )}</li>
        <li><span class="highlight">User Email:</span> ${booking.userEmail}</li>
      </ul>
      <p>Please review the booking and take necessary action.</p>
    </div>
   <div class="footer">
      <p>TRS Rides | Premium Transportation Services in Poland</p>
      <p>Warsaw, Poland | +48 512 376 189 | info@trsrides.com</p>
      <p>
        <a href="https://www.instagram.com/trs.rides?igsh=OHVibmVzdjljNHFs" style="color: #60a5fa; margin-right: 10px;">Instagram</a>
        <a href="https://www.facebook.com/share/15kM8upLCP/?mibextid=wwXIfr" style="color: #60a5fa;">Facebook</a>
      </p>
      <p>© ${new Date().getFullYear()} TRS Rides. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`;
