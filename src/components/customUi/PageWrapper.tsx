import type { ReactNode } from "react";

function PageWrapper({ children }: { children: ReactNode }) {
    return (
        // outside - main wrapper
        <div className='maximum-w container-space'>
            {children}
            {/* inner - for content */}
            {/* <div className='max-w-[900px] mx-auto md:max-w-[650px]'>
                {children}
            </div> */}
        </div>
    );
}

export default PageWrapper;
