import type { ReactNode } from "react";

function FormWrapper({ children }: { children: ReactNode }) {
    return (
        <section className='flex flex-col items-center justify-center mt-8 w-11/12 mx-auto'>
            {children}
        </section>
    );
}

export default FormWrapper;
