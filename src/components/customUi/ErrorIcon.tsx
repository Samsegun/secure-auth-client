import { Ban } from "lucide-react";

function ErrorIcon({ error }: { error: Error | null }) {
    return (
        <div className='flex flex-col justify-center items-center mt-8'>
            <h2 className='flex flex-col items-center gap-2 text-red-500'>
                <Ban size={48} />

                <p className='capitalize'>{error?.message}</p>
            </h2>
        </div>
    );
}

export default ErrorIcon;
