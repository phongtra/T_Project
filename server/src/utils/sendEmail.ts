import sgMail from '@sendgrid/mail';
import { sendGridKey } from '../keys';

export const sendEmail = (longtitude: number, latitude: number) => {
  sgMail.setApiKey(sendGridKey);
  const msg = {
    to: 'aphtr001@edu.xamk.fi',
    from: 'no-reply@tapalive.com',
    subject: 'Send Help',
    html: `
        <p>My location is : (${latitude}, ${longtitude})\nPlease send help!!!!!!</p>
        
    `
  };
  sgMail.send(msg);
};
