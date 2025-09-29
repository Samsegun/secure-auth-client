import { LoaderCircle } from "lucide-react";

function LoadingIcon() {
    return (
        <div className='flex justify-center items-center mt-12'>
            <LoaderCircle size={48} className='animate-spin' />
        </div>
    );
}

export default LoadingIcon;
