const sgMail = require("@sendgrid/mail");
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendAppointmentMail = async (detail) => {
  const [month, day, hour] = JSON.stringify(detail.date).match(
    /-[0-9][0-9]|[0-9][0-9]:[0-9][0-9]/g
  );
  try {
    console.log("detail", detail);
    const res = await sgMail.send({
      to: detail.email,
      from: "danah2139@gmail.com",
      subject: `TOR4U - An appointment has been made for you for ִ${detail.category}`,
      text: `Hi ${detail.name}! 
          An appointment has been made for you for ${
            detail.category
          } on ${day.replace("-", "")} / ${month.replace("-", "")} at ${hour},
          a cell phone number to contact ${detail.phone}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
