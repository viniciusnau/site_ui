import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import defaultStyles from './DropdownItem.module.css';
import { ChevronUp } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
  icon?: any;
}

interface Props {
  item: MenuItem;
  keyPath: string;
  isOpen: boolean;
  isActiveAncestor: boolean;
  isDesktop: boolean;
  toggleDropdown: (key: string) => void;
  renderMenuItems: (items: MenuItem[], parentKey: string) => React.ReactNode;
  customStyles?: { [key: string]: string };
}

const DropdownItem: React.FC<Props> = ({
  item,
  keyPath,
  isOpen,
  isActiveAncestor,
  isDesktop,
  toggleDropdown,
  renderMenuItems,
  customStyles = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (isDesktop) {
        ref.current.style.maxHeight = isOpen ? `${ref.current.scrollHeight}px` : '';
      } else {
        ref.current.style.maxHeight = isOpen ? `${ref.current.scrollHeight}px` : '0px';
      }
    }
  }, [isOpen, isDesktop]);

  const hasChildren = !!item.children;

  const getClass = (base: string) =>
    `${defaultStyles[base] || ''} ${customStyles[base] || ''}`.trim();

  return (
    <div className={getClass('menuItemWrapper')}>
      {hasChildren ? (
        <div
          className={`${getClass('menuItem')} ${isActiveAncestor ? getClass('activeAncestor') : ''}`}
          onClick={!isDesktop ? () => toggleDropdown(keyPath) : undefined}
        >
          <div className={getClass('menuItemWithIcon')}>
            {item.icon && (
              <item.icon size={16} className={getClass('menuIcon')} />
            )}
            <span className={getClass('label')}>{item.label}</span>
            <ChevronUp
              size={16}
              className={`${getClass('dropdownIcon')} ${isActiveAncestor ? getClass('rotated') : ''}`}
            />
          </div>
        </div>
      ) : (
        <Link
          to={item.path}
          className={`${getClass('menuItem')} ${isActiveAncestor ? getClass('activeAncestor') : ''}`}
        >
          <div className={getClass('menuItemWithIcon')}>
            {item.icon && (
              <item.icon size={16} className={getClass('menuIcon')} />
            )}
            <span>{item.label}</span>
          </div>
        </Link>
      )}

      {hasChildren && (
        <div
          ref={ref}
          className={
            isDesktop
              ? `${getClass('dropdown')} ${isOpen ? getClass('dropdownOpen') : ''}`
              : `${getClass('dropdownClick')} ${isOpen ? getClass('dropdownClickOpen') : ''}`
          }
        >
          {item.children && renderMenuItems(item.children, keyPath)}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
