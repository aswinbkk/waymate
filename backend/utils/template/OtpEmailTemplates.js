const otpTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:500px; margin:auto; background:#fff; padding:20px; border-radius:10px; text-align:center;">
        
        <h2 style="color:#333;">🔐 Password Reset</h2>
        
        <p style="color:#555;">Use the OTP below to reset your password</p>
        
        <div style="font-size:32px; font-weight:bold; color:#2d89ef; margin:20px 0;">
          ${otp}
        </div>
        
        <p style="color:#999;">This OTP expires in 5 minutes</p>
        
        <hr />
        
        <p style="font-size:12px; color:#aaa;">
          If you didn’t request this, please ignore this email.
        </p>

      </div>
    </div>
  `;
};

module.exports = {otpTemplate};