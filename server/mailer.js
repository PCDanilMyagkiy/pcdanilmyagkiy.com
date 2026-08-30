import nodemailer from "nodemailer";



export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

await transporter.verify();
console.log("SMTP transporter ready");

export const sendVerCode = async (code, to) => {
    return transporter.sendMail({
        from: `"PCDanil_Myagkiy's portfolio project" <${process.env.MAIL_USER}>`,
        to,
        subject: "Confirm your email",
        text: "Confirm your email",
        html: `
            <h2>Email verification for PCDanil_Myagkiy's portfolio project</h2>
            <hr />
            <h2>Your code:</h2>
            <h1>${code}</h1>
            <hr />
            <h2>Active due: 20:25 27.12.2025</h2>
            <hr />
            <h2>Enter the code in the "Verification code" text pole in the registration page</h2>
        `
    });
}