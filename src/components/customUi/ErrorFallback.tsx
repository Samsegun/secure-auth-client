import { Button } from "../ui/button";

function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: any;
    resetErrorBoundary: any;
}) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-2xl font-bold mb-4'>Something went wrong</h2>
            <p className='text-gray-600 mb-4'>{error.message}</p>
            <Button
                onClick={resetErrorBoundary}
                className='bg-[#32bc9c7b] cursor-pointer'>
                Try again
            </Button>
        </div>
    );
}

export default ErrorFallback;
