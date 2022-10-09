import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '/@/components/ui/atomic-components';
import { ColorPickerModal } from './ColorPickerModal';
interface color {
	show?: boolean;
	onSelectColor: (newValue: string) => void;
	color: string;
}

export const ColorPicker: FC<React.PropsWithChildren<color>> = ({ onSelectColor, color }) => {

	const [showModal, setShowModal] = useState(false)

	const onShowModal = () => {
		setShowModal(true)
	}

	return (
		<>
			<div className="ml-4">
				<Button onClick={onShowModal}>
					Color
				</Button>
			</div>

			<ColorPickerModal showModal={showModal} setShowModal={setShowModal} color={color} onSelectColor={onSelectColor} />
		</>
	)
}
