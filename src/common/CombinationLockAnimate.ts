let lockRestingColor: any;
const TimelineMax = (window as any).TimelineMax;
const Back = (window as any).Back;
const Power0 = (window as any).Power0;
const Power2 = (window as any).Power2;
export const handlePass = () => {
	const tl = new TimelineMax({ onComplete: finishUnlockAttempt });
	lockRestingColor = 'hsl(120,50%,100%)';

	tl.to('#box', 0, { fill: lockRestingColor });
	tl.to('#bar', 0, { stroke: lockRestingColor });
	tl.to('#bar', 0.3, { y: -20, ease: Back.easeOut.config(4) }, 'b');
	tl.to('#padlock', 0.3, { scale: 1.2, ease: Back.easeOut.config(4) }, 'b');
	tl.to('#box', 0.3, { fill: 'hsl(120,50%,60%)' }, 'b');
	tl.to('#bar', 0.3, { stroke: 'hsl(120,50%,60%)' }, 'b');
}

export const handleNoPass = () => {
	const tl = new TimelineMax({ onComplete: finishUnlockAttempt });
	lockRestingColor = 'hsl(0,50%,100%)';

	tl.to('#box', 0, { fill: lockRestingColor });
	tl.to('#bar', 0, { stroke: lockRestingColor });
	tl.to('#bar', 0.1, { y: 0, ease: Power0.easeNone }, 'b');
	tl.to('#padlock', 0.1, { scale: 1, ease: Power0.easeNone }, 'b');
	tl.to('#box', 0.1, { fill: 'hsl(0,50%,60%)' }, 'b');
	tl.to('#bar', 0.1, { stroke: 'hsl(0,50%,60%)' }, 'b');
	tl.to('#padlock', 0.1, { x: 260 });
	tl.to('#padlock', 0.1, { x: 240 });
	tl.to('#padlock', 0.1, { x: 260 });
	tl.to('#padlock', 0.1, { x: 250 });
}



export const startUnlockAttempt = (onComplete: any) => {
	const tl = new TimelineMax({ onComplete });

	tl.to('#unlock-button', 0.5, { y: 550, opacity: 0, ease: Power2.easeInOut }, 'a');
	tl.staggerTo('.combination-input', 0.5, { y: 200, opacity: 0, ease: Power2.easeInOut }, 0.1);
	tl.to('#padlock', 0.5, { y: 250, ease: Power2.easeInOut });

	tl.to('#padlock', 1, { scale: 0.9 }, 'build');
	tl.to('#bar', 1, { y: 10 }, 'build');
}

export const finishUnlockAttempt = (callBack?: Function) => {
	const tl = new TimelineMax();

	tl.to('#response-text', 0.5, { y: 30, opacity: 1 });
	tl.to('#response-text', 2, {});
	tl.to('#response-text', 0.5, { y: 0, opacity: 0 });
	tl.to('#box', 0.25, { fill: lockRestingColor, ease: Power2.easeInOut }, 'a');
	tl.to('#bar', 0.25, { stroke: lockRestingColor, y: 0, ease: Power2.easeInOut }, 'a');
	tl.to('#padlock', 0.25, { scale: 1, y: 220 }, 'a');
	tl.to('#unlock-button', 0.5, { y: 450, opacity: 1 }, 'b');
	tl.staggerTo('.combination-input', 0.5, { y: 0, opacity: 1 }, 0.1)

	if (callBack) callBack();

}
