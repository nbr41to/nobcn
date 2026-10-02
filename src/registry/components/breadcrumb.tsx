"use client";

import { Fragment } from "react";
import * as Primitive from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Explicit Japanese labels; no URL-to-label guessing or Next.js dependency. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Primitive.Breadcrumb aria-label="パンくずリスト">
      <Primitive.BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.href ?? item.label}>
            {index > 0 && <Primitive.BreadcrumbSeparator />}
            <Primitive.BreadcrumbItem>
              {index === items.length - 1 || !item.href ? (
                <Primitive.BreadcrumbPage>
                  {item.label}
                </Primitive.BreadcrumbPage>
              ) : (
                <Primitive.BreadcrumbLink href={item.href}>
                  {item.label}
                </Primitive.BreadcrumbLink>
              )}
            </Primitive.BreadcrumbItem>
          </Fragment>
        ))}
      </Primitive.BreadcrumbList>
    </Primitive.Breadcrumb>
  );
}
