const Mailgen = require('mailgen');
const config = require('./../config/email.json')
const sgMail = require('@sendgrid/mail');
require('dotenv').config();


class EmailService {
    #sender = sgMail
    #GenerateTempleate = Mailgen
    constructor(env) {
        switch(env){
            case 'development':
                this.link = config.dev
            break;
            case 'production':
                this.link = config.prod
            break;
            default: break;
        }
    }
    #createTemplate(verifyToken,){
        const mailGenerator = new this.#GenerateTempleate({
            theme: 'neopolitan',
            product: {
                name: 'System Contacts',
                link: this.link
            }
        });
        const sendEmail = {
            body: {
                name: 'Developer',
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Mailgen, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Подтвердить свой аккаунт',
                        link: `${this.link}auth/verify/${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        return mailGenerator.generate(sendEmail);
    }
    async sendEmail(verifyToken, email){

        console.log(verifyToken, email);

        const emailBody = this.#createTemplate(verifyToken)
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email,
            from: 'no-reply@system.com', // Use the email address or domain you verified above
            subject: 'Подтверждение регистрации',
            html: emailBody,
          };
          await this.#sender.send(msg)

          console.log('SEND MAIL', verifyToken, email);

    }
}

module.exports = EmailService