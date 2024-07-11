import Link from "next/link";


const LinkButton = ({
    href,
    extraClass,
    children
}) => {
    return (
        <Link href={href}
            role="button"
            className={`bg-red-500 text-white text-xl capitalize group text-center inline-block cursor-pointer ${extraClass}`}
        >
            {children}
        </Link>
    );
};

export default LinkButton;
