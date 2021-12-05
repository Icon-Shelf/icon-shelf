import { FC, useRef, useState, useEffect } from 'react';
import { Icon } from 'data/icons';
import SVG from 'react-inlinesvg';
import { formatBytes } from 'utils/formatBytes';
import { formatDate } from 'utils/formatDate';
import { IconActionsButton } from './IconActionsButton';

interface Props {
  selectedIcon: Icon | null;
}

export const RightIconDetailsSection: FC<Props> = ({ selectedIcon }) => {
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

  useEffect(() => {
    setSvgDimensions('-');
  }, [selectedIcon]);

  return (
    <div className="flex flex-col justify-between bg-black2 w-96 p-4 pt-5 min-w-max flex-shrink-0">
      <div>
        <div className="w-full bg-black h-40 rounded-md flex items-center justify-center">
          {selectedIcon?.imageSrc && (
            <SVG
              onLoad={onSvgLoad}
              src={selectedIcon.imageSrc}
              className="h-14 w-14 text-white"
              innerRef={svgRef}
            />
          )}
        </div>

        <div className="flex flex-col mt-3">
          <span className="text-white">{selectedIcon?.name}</span>
          <span className="mt-1 text-sm">
            {(selectedIcon?.byteSize && formatBytes(selectedIcon?.byteSize)) || '-'}
          </span>
        </div>

        <div className="mt-8">
          <div className="text-white mb-1">Details</div>

          <div className="flex justify-between">
            <span className="mt-1">Format</span>
            <span className="mt-1 text-white uppercase">{selectedIcon?.mime || '-'}</span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="mt-1">Dimensions</span>
            <span className="mt-1 text-white">{svgDimensions}</span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="mt-1">Updated</span>
            <span className="mt-1 text-white">{formatDate(selectedIcon?.updatedAt) || '-'}</span>
          </div>
        </div>
      </div>

      <div>{selectedIcon && <IconActionsButton icon={selectedIcon} />}</div>
    </div>
  );
};
