import Link from "next/link";

// Task: fix the freezed styles

interface TabProps {
    link: string;
    white?: boolean;
    blue?: boolean;
    children: string;
}

export default function Tab({ link, white, blue, children }: TabProps) {
    let className = "font-bold p-6 rounded-full";

    if (white) {
        className += " bg-white text-black";
    } else if (blue) {
        className += " bg-[#2563EB] text-white";
    }

    return (
        <Link href={link} className={className}>
            {children}
        </Link>
    );
}

