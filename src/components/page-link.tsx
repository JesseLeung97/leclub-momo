import { FC } from "preact/compat"
import styled from "styled-components"
import { Link } from "wouter-preact"

const linkStyles = `
  height: 30px;
  line-height: 30px;
  color: var(--lcm-purple);
  text-decoration: none;
  transition: all .2s ease-in-out;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`
const PrettyLink = styled(Link)<{
  noPadding?: boolean
  heavy?: boolean
  size?: "small" | "medium" | "large"
  underline?: boolean
}>`
  ${linkStyles}
  margin: ${(props) => (props.noPadding ? "0" : "4px 12px")};
  font-weight: ${(props) => (props.heavy ? "bold" : "regular")};
  font-size: ${(props) => `var(--font-${props.size})`};
  border-bottom: ${(props) =>
    props.underline ? "2px solid var(--lcm-purple)" : "2px solid transparent"};
`

const PrettyA = styled.a<{
  noPadding?: boolean
  heavy?: boolean
  size?: "small" | "medium" | "large"
  underline?: boolean
}>`
  ${linkStyles}
  margin: ${(props) => (props.noPadding ? "0" : "4px 12px")};
  font-weight: ${(props) => (props.heavy ? "bold" : "regular")};
  font-size: ${(props) => `var(--font-${props.size})`};
  border-bottom: ${(props) =>
    props.underline ? "2px solid var(--lcm-purple)" : "2px solid transparent"};
`

interface Props {
  to: string
  text?: string
  external?: boolean
  noPadding?: boolean
  heavy?: boolean
  size?: "small" | "medium" | "large"
  underline?: boolean
}

export const PageLink: FC<Props> = ({
  to,
  text = "",
  external = false,
  noPadding = false,
  heavy = true,
  size = "medium",
  underline = false,
  children,
}) => {
  return (
    <>
      {children ? (
        <PrettyA
          heavy={heavy}
          noPadding={noPadding}
          size={size}
          href={to}
          underline={underline}
        >
          {children}
        </PrettyA>
      ) : external ? (
        <PrettyA
          heavy={heavy}
          noPadding={noPadding}
          underline={underline}
          size={size}
          href={to}
        >
          {text}
        </PrettyA>
      ) : (
        <PrettyLink
          underline={underline}
          heavy={heavy}
          noPadding={noPadding}
          size={size}
          to={to}
        >
          {text}
        </PrettyLink>
      )}
    </>
  )
}
