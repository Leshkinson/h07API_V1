interface UserInvitation {
    to: string,
    html: string
}

export function userInvitationTemplate(mail: string, code: string): UserInvitation {
    return {
        to: mail,
        html: `
        <h1>Thank for your registration!</h1>
    <p>To finish registration please follow the link below:
        <a href='https://h07-api-v1.vercel.app/auth/registration-email-resending?code=${code}'>complete registration</a>
    </p>`
    }
}