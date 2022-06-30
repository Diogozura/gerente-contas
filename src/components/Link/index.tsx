import Link from 'next/link'
import styled from 'styled-components'

interface Props{
    href: string,
    name: string,
    onClick?: ()=> void
}

const A = styled.a`
    color: white;
    background-color: #1b80d8;
    font-size: 1.3em;
    border-radius: 10px;
    margin: 1em;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    animation-delay: 2s;
    :hover{
        background-color: rgba(27, 128, 216, 0.9);
        text-decoration: underline;
    }
`


export default function LinkPage({ name , href, onClick, ...props}:Props) {
    return (
        <>
            <Link href={href} prefetch={false} passHref >
                <A {...props} onClick={onClick} >
            {name}
        </A>
            </Link>   

        
    </>
       
       
    )
}
