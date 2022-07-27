import Link from "next/link"

export default function LinkOrg({href, children}){
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    )
}