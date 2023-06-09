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
        <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
    </p>`
    }
}