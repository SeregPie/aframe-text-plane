import TextPlane from '@seregpie/three.text-plane';

import name from './name';

export default function() {
	let {
		data,
		el,
	} = this;
	let {
		alignment,
		backgroundColor,
		color,
		fontFamily,
		fontSize,
		fontStyle,
		fontVariant,
		fontWeight,
		lineGap,
		padding,
		strokeColor,
		strokeWidth,
		text,
	} = data;
	let object = new TextPlane({
		alignment,
		backgroundColor,
		color,
		fontFamily,
		fontSize,
		fontStyle,
		fontVariant,
		fontWeight,
		lineGap,
		padding,
		strokeColor,
		strokeWidth,
		text,
	});
	el.setObject3D(name, object);
}
