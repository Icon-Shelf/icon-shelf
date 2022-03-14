export const calculateMenuLeft = (mouseX: number, parentDom: HTMLDivElement) => {
  const menuWidth = 142;
  const dims = parentDom.getBoundingClientRect();

  if (mouseX + menuWidth < dims.right) {
    return mouseX - 260;
  }

  return mouseX - menuWidth - 260;
};

export const calculateMenuTop = (mouseY: number, parentDom: HTMLElement, itemsCount: number) => {
  const menuItemHeight = 45;
  const menuHeight = menuItemHeight * itemsCount;

  const dims = parentDom.getBoundingClientRect();

  if (mouseY + menuHeight > dims.bottom) {
    return mouseY - menuHeight;
  }

  return mouseY;
};
