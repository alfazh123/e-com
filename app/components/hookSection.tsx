interface HookSectionProps {
    title: string;
    description: string;
    imgurl?: string;
}

export default function HookSection({ title, description, imgurl }: HookSectionProps) {
    return (
        <div className="sticky top-0 bg-white w-full justify-center md:h-screen min-h-screen flex items-center border-t border-gray-300">
            <div className="grid h-[90%] md:grid-cols-2 grid-cols-1 gap-8 items-center">
                <div className="md:text-end text-start md:pr-0 px-8 md:pl-20 md:pt-0 pt-28">
                    <h3 className="text-3xl font-semibold">
                        {title}
                    </h3>
                    <p className="text-lg w-full max-w-xl">
                        {description}
                    </p>    
                </div>
                <div className="md:w-[70%] w-full md:h-[50%] h-full md:rounded-4xl bg-slate-300  aspect-square"></div>
            </div>
        </div>
    )
}