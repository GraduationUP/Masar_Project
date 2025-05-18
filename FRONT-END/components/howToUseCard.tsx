import Span from "./ui/Span";

interface HowToUseCardProps {
    muiIcon: any,
    title: string,
    description: string,
}

export default function HowToUseCard({muiIcon, title, description}: HowToUseCardProps) {
    return(
        <div className="flex flex-col text-center justify-center items-center border border-[#E5E7EB] w-[370px]">
            <div className="rounded-full w-20 h-20 bg-gradient-to-r from-[#7C3AED1A] to-[#2563EB1A] flex items-center justify-center text-[#2563EB]">{muiIcon}</div>
            <p className="font-bold text-xl">{title}</p>
            <Span>{description}</Span>
        </div>
    )
}