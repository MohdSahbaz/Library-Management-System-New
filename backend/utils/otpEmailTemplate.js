const otpEmailTemplate = (otpCode, option) => `
  <div style="max-width: 400px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif;">
      <div style="background-color: #2D8C7A; color: #ffffff; padding: 10px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0;">
          Your OTP Code
      </div>
      <p>Greetings from LMS,</p>
      <p>Your OTP code is:</p>
      <div style="font-size: 24px; font-weight: bold; color: #2D8C7A; margin: 20px 0;">
          ${otpCode}
      </div>
      <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
      <div style="font-size: 12px; color: #777; margin-top: 10px;">
          If you did not request this, please ignore this email.
      </div>
  </div>
`;

const otpEmailTemplateForUpdate = (otpCode) => `
  <div style="max-width: 400px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif;">
      <div style="background-color: #2D8C7A; color: #ffffff; padding: 10px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0;">
          OTP for Profile Update
      </div>
      <p>Hello,</p>
      <p>You have requested to update your profile information.</p>
      <p>Your OTP code for verification is:</p>
      <div style="font-size: 24px; font-weight: bold; color: #2D8C7A; margin: 20px 0;">
          ${otpCode}
      </div>
      <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
      <div style="font-size: 12px; color: #777; margin-top: 10px;">
          If you did not request this update, please ignore this email or contact support.
      </div>
  </div>
`;

const otpEmailTemplateForLibrarian = (otpCode, reason) => `
  <div style="max-width: 400px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); text-align: center; font-family: Arial, sans-serif;">
      <div style="background-color: #2D8C7A; color: #ffffff; padding: 10px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0;">
          OTP for Librarian ${reason || "Registration"}
      </div>
      <p>Hello,</p>
      ${
        !reason
          ? "<p>You are registering as a librarian in the LMS system.</p>"
          : ""
      }
      <p>Your OTP code for verification is:</p>
      <div style="font-size: 24px; font-weight: bold; color: #2D8C7A; margin: 20px 0;">
          ${otpCode}
      </div>
      <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
      <div style="font-size: 12px; color: #777; margin-top: 10px;">
          If you did not request this ${
            reason || "registration"
          }, please ignore this email or contact support.
      </div>
  </div>
`;

module.exports = {
  otpEmailTemplate,
  otpEmailTemplateForUpdate,
  otpEmailTemplateForLibrarian,
};
