import Link from 'next/link'
import styled from 'styled-components'

interface Props{
    href: string,
    name:string
}

const A = styled.a`
    color: black;
    background-color: #1b80d8;
    padding: 10px;
`


export default function LinkPage({ name , href, ...props}:Props) {
    return (
        <>
            <Link href={href}>
                <A {...props}>
            {name}
        </A>
            </Link>   

        
    </>
       
       
    )
}