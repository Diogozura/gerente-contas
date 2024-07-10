import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styled from 'styled-components';

interface CustomLinkProps extends NextLinkProps {
  children: React.ReactNode;
  color?: string
}
const RedLink = styled.a`
  color: red;
`
const CustomLink: React.FC<CustomLinkProps> = ({ href, children, color ,...rest }) => (
  <NextLink href={href} {...rest}>
    <RedLink>{children}</RedLink>


  </NextLink>
);

export default CustomLink;
