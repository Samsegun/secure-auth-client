import { Button } from "../ui/button";

function ErrorIcon({ error }: { error: Error | null }) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <section className='flex flex-col items-center'>
                <h2 className='text-2xl font-bold mb-4'>
                    Something went wrong
                </h2>

                <p className='capitalize font-bold text-gray-600 mb-4'>
                    {error?.message}
                </p>

                <Button
                    className='text-white bg-[#32bc9c7b] cursor-pointer'
                    onClick={() => window.location.reload()}>
                    Try again
                </Button>
            </section>
        </div>
    );
}

export default ErrorIcon;
