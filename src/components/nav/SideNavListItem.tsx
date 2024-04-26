import {
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type SideNavListItemProps = {
  title: string
  target?: string
  href?: string
  titleStyle?: string
  containerStyle?: string
  onNavItemClick: VoidFunction
}

export const SideNavListItem = ({ title, onNavItemClick, target, href, titleStyle, containerStyle }: SideNavListItemProps) => {
  return (
    <li className={`${containerStyle}`}>
      <a
        href={href}
        target={target}
        onClick={onNavItemClick}
        className="hover:text-brand-primary hover:bg-gray-50 cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      >
        <div className={`w-5/6 ${titleStyle}`}>{title}</div>
        <div className="w-1/5 flex justify-end">
          <ChevronRightIcon className="h-6 w-6 stroke-2 text-gray-400" />
        </div>
      </a>
    </li>
  )
}