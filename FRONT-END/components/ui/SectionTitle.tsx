interface SectionTitleProps {
    title: string,
    discription: string,
    textCenter?: boolean,
}
export default function SectionTitle({ title, discription, textCenter }: SectionTitleProps) {
    return (
        <div className={textCenter ? "text-center" : ""}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            <p className="text-gray-500 text-lg">
                {discription}
            </p>
        </div>
    )
}

