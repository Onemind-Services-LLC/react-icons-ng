import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ActiveLink = ({
  children,
  href,
  activeClassName = "active",
  ...props
}) => {
  const router = useRouter();

  const child = React.Children.only(children);

  let className = child.props.className || "";

  if (router.asPath === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return (
    <Link href={href} {...props} legacyBehavior>
      {React.cloneElement(child, { className })}
    </Link>
  );
};

export default ActiveLink;
