import { Breadcrumb, type BreadcrumbProps } from 'antd'
import { Link, useMatches } from 'react-router-dom'
import type { RouteHandle } from '../../routes/types'

export function AppBreadcrumb() {
  const matches = useMatches()

  const titledMatches = matches
    .map((match) => {
      const handle = match.handle as RouteHandle | undefined
      const title = handle?.meta?.title

      if (!title) {
        return null
      }

      const to =
        handle?.meta?.breadcrumbTo ?? handle?.meta?.redirectTo ?? match.pathname

      return { title, to }
    })
    .filter((match): match is { title: string; to: string } => Boolean(match))

  const items = titledMatches.map<
    NonNullable<BreadcrumbProps['items']>[number]
  >((match, index) => {
    const isLast = index === titledMatches.length - 1
    return {
      title: isLast ? match.title : <Link to={match.to}>{match.title}</Link>,
    }
  })

  return <Breadcrumb items={items} />
}
