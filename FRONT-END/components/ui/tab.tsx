import Link from "next/link";

// Tasks:
// Add Tailwind Config file
// Add the main blue color to the config file

interface TabProps {
    link: string;
    bgColor: string;
    children: string;
}

export default function Tab({ link, bgColor, children }: TabProps) {
    return (
        <Link href={link} className={`bg-${bgColor}-main`}>
            {children}
        </Link>
    )
}