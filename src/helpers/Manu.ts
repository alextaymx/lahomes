import { MENU_ITEMS } from "@/assets/data/menu-items";
import type { MenuItemType } from "@/types/menu";

export const getMenuItems = (): MenuItemType[] => {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // In production, only show items before the "CUSTOM" section
    const customSectionIndex = MENU_ITEMS.findIndex(
      (item) => item.key === "custom",
    );
    return MENU_ITEMS.slice(0, customSectionIndex).filter(
      (item) => !item.isTitle || item.key === "menu",
    );
  }

  // In development, show all items
  return MENU_ITEMS;
};

export const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: MenuItemType,
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem.parentKey);
  if (parent) {
    parents.push(parent.key);
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)];
    }
  }
  return parents;
};

export const getMenuItemFromURL = (
  items: MenuItemType | MenuItemType[],
  url: string,
): MenuItemType | undefined => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    if (items.url == url) return items;
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url == url) return item;
      }
    }
  }
};

export const findMenuItem = (
  menuItems: MenuItemType[] | undefined,
  menuItemKey: MenuItemType["key"] | undefined,
): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (const item of menuItems) {
      if (item.key === menuItemKey) {
        return item;
      }
      const found = findMenuItem(item.children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
