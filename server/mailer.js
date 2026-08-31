import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerCode = async (code, to, expiresAt) => {
    const { data, error } = await resend.emails.send({
        from: `"PCDanil_Myagkiy's portfolio project" <onboarding@resend.dev>`,
        to,
        subject: "Confirm your email",
        text: "Confirm your email",
        html: `
            <h2>Email verification for PCDanil_Myagkiy's portfolio project</h2>
            <hr />
            <h2>Your code:</h2>
            <h1>${code}</h1>
            <hr />
            <h2>Active due: ${expiresAt}</h2>
            <hr />
            <h2>Enter the code in the "Verification code" text field in the registration page</h2>
        `
    });

    if (error) throw new Error(`Failed to send verification code: ${error.message}`);

    return data;
}