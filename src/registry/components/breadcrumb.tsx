"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import * as Primitive from "@/components/ui/breadcrumb";

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter((segment) => segment) || [];
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const name = segment
      .replace(/-/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    return { name, href, isLast };
  });

  return (
    <Primitive.Breadcrumb>
      <Primitive.BreadcrumbList>
        {breadcrumbItems.map(({ name: segment, href, isLast }) =>
          isLast ? (
            <Primitive.BreadcrumbItem key={href}>
              <Primitive.BreadcrumbPage>{segment}</Primitive.BreadcrumbPage>
            </Primitive.BreadcrumbItem>
          ) : (
            <Fragment key={href}>
              <Primitive.BreadcrumbItem className="hidden md:block">
                <Primitive.BreadcrumbLink asChild>
                  <Link href={href}>{segment}</Link>
                </Primitive.BreadcrumbLink>
              </Primitive.BreadcrumbItem>
              <Primitive.BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ),
        )}
      </Primitive.BreadcrumbList>
    </Primitive.Breadcrumb>
  );
};
