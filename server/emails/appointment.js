const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendAppointmentMail = async (detail) => {
  await sgMail.send({
    to: detail.email,
    from: "danah2139@gmail.com",
    subject: `TOR4U- An appointment has been made for you for a ִ${detail.category}`,
    text: `Hi ${detail.name}! 
        An appointment has been made for you for a ${detail.category} for ${detail.date} ,
        a cell phone number to contact ${detail.phone}`,
  });
};
