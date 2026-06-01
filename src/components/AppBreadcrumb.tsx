import { Breadcrumb, type BreadcrumbProps } from "antd";
import { Link, useMatches } from "react-router-dom";
import type { RouteHandle } from "../routes/types";

export function AppBreadcrumb() {
  const matches = useMatches();

  const items = matches.reduce<NonNullable<BreadcrumbProps["items"]>>(
    (breadcrumbItems, match, index) => {
      const handle = match.handle as RouteHandle | undefined;
      const title = handle?.meta?.title;

      if (!title) {
        return breadcrumbItems;
      }

      const isLast = index === matches.length - 1;
      breadcrumbItems.push({
        title: isLast ? title : <Link to={match.pathname}>{title}</Link>,
      });

      return breadcrumbItems;
    },
    [],
  );

  return <Breadcrumb items={items} />;
}
