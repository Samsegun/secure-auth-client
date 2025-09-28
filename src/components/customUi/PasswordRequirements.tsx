interface PasswordRequirementProps {
    password: string;
}

const PasswordRequirements = ({ password }: PasswordRequirementProps) => {
    const requirements = [
        {
            text: "At least 8 characters long",
            isMet: password.length >= 8,
        },
        {
            text: "Contains uppercase letter",
            isMet: /[A-Z]/.test(password),
        },
        {
            text: "Contains lowercase letter",
            isMet: /[a-z]/.test(password),
        },
        {
            text: "Contains number",
            isMet: /[0-9]/.test(password),
        },
        {
            text: "Contains special character",
            isMet: /[@$!%*?&]/.test(password),
        },
    ];

    return (
        <div className='mt-2 space-y-2'>
            {requirements.map((req, index) => (
                <div key={index} className='flex items-center gap-2 text-sm'>
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            req.isMet ? "bg-green-500" : "bg-gray-300"
                        }`}>
                        {req.isMet && (
                            <span className='text-white text-xs'>✓</span>
                        )}
                    </div>
                    <span
                        className={
                            req.isMet ? "text-green-500" : "text-gray-500"
                        }>
                        {req.text}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PasswordRequirements;
