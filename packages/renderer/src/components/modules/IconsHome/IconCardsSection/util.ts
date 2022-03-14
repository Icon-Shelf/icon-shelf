import type { Icon } from '/@/data/icons';

export const findSelectedIconPos = (icons: Icon[]) => {
  let iconPos = null;
  const selectedIconDom = document.querySelector('[data-is-selected=true]');

  if (selectedIconDom) {
    const iconId = selectedIconDom.getAttribute('data-icon-card-id');

    if (iconId) {
      iconPos = icons.map((icon) => icon.id).indexOf(parseInt(iconId));
    }
  }

  return iconPos;
};

export const getNumberOfIconInRow = (): number => {
  let gridColumnCount = 0;
  const iconsWrapperDom = document.querySelector('.virtualized-icons-grid-container');
  if (iconsWrapperDom) {
    const gridComputedStyle = window.getComputedStyle(iconsWrapperDom);

    gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;
  }

  return gridColumnCount;
};
