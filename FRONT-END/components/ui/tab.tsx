import Link from "next/link";

interface TabProps {
    link: string;
    white?: boolean;
    blue?: boolean;
    children: any;
}

export default function Tab({ link, white, blue, children }: TabProps) {
    let className = "font-bold py-2 px-5 rounded-full";

    if (white) {
        className += " bg-white text-black border border-black";
    } else if (blue) {
        className += " bg-gradient-to-r from-[#2563EB] to-[#4A90E2] text-white";
    }

    return (
        <Link href={link}>
            <span className={className}>{children}</span>
        </Link>
    );
}

