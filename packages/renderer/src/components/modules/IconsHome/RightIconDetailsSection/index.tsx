import type { FC } from 'react';
import { useRef, useState, useEffect } from 'react';
import type { Icon } from '/@/data/icons';
import SVG from 'react-inlinesvg';
import { formatBytes } from '/@/utils/formatBytes';
import { formatDate } from '/@/utils/formatDate';
import { IconDisplay } from '/@/components/ui/atomic-components';
import { detectOS } from '/@/utils/detectOS';
import { ActionsButton } from './ActionsButton';

interface Props {
  selectedIcon: Icon | null;
}

export const RightIconDetailsSection: FC<React.PropsWithChildren<Props>> = ({ selectedIcon }) => {
  const platform = detectOS();
  const svgRef = useRef<SVGElement>(null);

  const [svgDimensions, setSvgDimensions] = useState('-');

  const getSvgDimensions = (node: SVGElement) => {
    const widthAttr = node?.getAttribute('width');
    const heightAttr = node?.getAttribute('height');
    const viewBox = node.getAttribute('viewBox');
    if (widthAttr && heightAttr) {
      return `${widthAttr} x ${heightAttr}`;
    }
    if (viewBox) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { width, height } = (node as any).viewBox.baseVal;

      return `${width} x ${height}`;
    }

    return '';
  };

  const onSvgLoad = () => {
    const node = svgRef.current;

    if (node) {
      setSvgDimensions(getSvgDimensions(node));
    }
  };

  const constructIconSrcPath = (path: string) => {
    let formattedSrcPath = path;
    if (platform === 'Windows') {
      formattedSrcPath = path.replace(/\\/g, '/');
    }

    return formattedSrcPath;
  };

  useEffect(() => {
    setSvgDimensions('-');
  }, [selectedIcon]);

  return (
    <div className="flex w-96 min-w-max flex-shrink-0 flex-col justify-between bg-gray-200 p-4 pt-5 dark:bg-black2">
      <div>
        <div className="flex h-40 w-full items-center justify-center rounded-md bg-gray-100 dark:bg-black">
          {selectedIcon?.imageSrc && (
            <>
              <SVG
                onLoad={onSvgLoad}
                src={`icon-image://${encodeURI(constructIconSrcPath(selectedIcon.imageSrc))}`}
                className="hidden h-14 w-14 text-white"
                innerRef={svgRef}
              />
              <IconDisplay
                src={selectedIcon.imageSrc}
                className="h-14 w-14 bg-black text-black dark:bg-white dark:text-white"
              />
            </>
          )}
        </div>

        <div className="mt-3 flex flex-col">
          <span className="text-black dark:text-white">{selectedIcon?.name}</span>
          <span className="mt-1 text-sm">
            {(selectedIcon?.byteSize && formatBytes(selectedIcon?.byteSize)) || '-'}
          </span>
        </div>

        <div className="mt-8">
          <div className="mb-1 text-black dark:text-white">Details</div>

          <div className="flex justify-between">
            <span className="mt-1">Format</span>
            <span className="mt-1 uppercase text-black dark:text-white">
              {selectedIcon?.mime || '-'}
            </span>
          </div>

          <div className="mt-1 flex justify-between">
            <span className="mt-1">Dimensions</span>
            <span className="mt-1 text-black dark:text-white ">{svgDimensions}</span>
          </div>

          <div className="mt-1 flex justify-between">
            <span className="mt-1">Updated</span>
            <span className="mt-1 text-black dark:text-white">
              {formatDate(selectedIcon?.updatedAt) || '-'}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full">{selectedIcon && <ActionsButton icon={selectedIcon} />}</div>
    </div>
  );
};
