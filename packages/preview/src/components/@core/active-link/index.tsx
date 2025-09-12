"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({
  children,
  href,
  activeClassName = "active",
  ...props
}) => {

  const path = usePathname();


  const child = React.Children.only(children);

  let className = child.props.className || "";

  if (path === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return (
    <Link href={href} {...props} legacyBehavior>
      {React.cloneElement(child, { className })}
    </Link>
  );
};

export default ActiveLink;
