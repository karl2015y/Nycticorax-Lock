<template>
	<div style="user-select: none;
width:100vw; height:80vh;margin-left:auto; margin-right: auto;">
		<svg id="svg" viewBox="0 0 500 500" width="100%" height="100%">
			<defs>
				<g class="combination-input-template">
					<rect x=-25 y=-40 width=50 height=80 fill="none" stroke="white" stroke-width=2 rx="3" />
					<text class="text-value" x=0 y=13 font-size="36" fill="white" text-anchor="middle">
						0
					</text>
					<path d="M0 -32 l5 10 l-10 0 z" fill="white" />
					<path d="M0 32 l5 -10 l-10 0 z" fill="white" />
					<rect class="up-button" x=-25 y=-40 width=50 height=40 fill="transparent" />
					<rect class="down-button" x=-25 y=0 width=50 height=40 fill="transparent" />
				</g>
			</defs>
			<g id="padlock" transform="translate(250,220)">
				<rect id='box' x=-60 y=-45 width=120 height=90 rx=5 fill="hsl(120,50%,100%)" />
				<path id="bar" d="M-35 -45
						 v-40
						 c 0 -40, 70 -40, 70,0
						 v80" stroke-width=15 stroke-linecap="round" fill="none" stroke="hsl(120,50%,100%)" />
			</g>
			<g v-on:click="clickUnlockButton()" id="unlock-button" transform="translate(250,450)">
				<text x=0 y=6 font-size="16" fill="white" text-anchor="middle">
					UNLOCK
				</text>
				<rect x=-50 y=-20 width=100 height=40 fill="transparent" stroke="white" stroke-width=2 rx="3" />
			</g>
			<text ref="responseTextRef" id="response-text" x=50% y=360 font-size="50" fill="white" text-anchor="middle"
				opacity=0>
				{{responseText}}
			</text>
			<g id="combination-input-container" transform="translate(250,365)">
				<g v-for="item,index in inputNumber"
					class="combination-input" :transform="`translate(${setInputTranslation(index)},0)`">
					<rect x=-25 y=-40 width=50 height=80 fill="none" stroke="white" stroke-width=2 rx="3" />
					<text class="text-value" x=0 y=13 font-size="36" fill="white" text-anchor="middle">
						{{item}}

					</text>
					<path d="M0 -32 l5 10 l-10 0 z" fill="white" />
					<path d="M0 32 l5 -10 l-10 0 z" fill="white" />
					<rect v-on:click="inputNumber[index]=rollOver(item+1)" class="up-button" x=-25 y=-40 width=50
						height=40 fill="transparent" />
					<rect v-on:click="inputNumber[index]=rollOver(item-1)" class="down-button" x=-25 y=0 width=50
						height=40 fill="transparent" />
				</g>

			</g>
		</svg>
	</div>

</template>

<script setup lang="ts">
import { handleNoPass, handlePass, startUnlockAttempt } from '../../src/common/CombinationLockAnimate'
import { computed, ref } from 'vue';



//密碼
// 處理密碼
const pass = ref(5877)
const comboArray = computed(() => (pass.value + '').split('').map((x) => parseInt(x, 10)))


// 處理輸入框
const inputWidth = 60;
const setInputTranslation = (index: number) => (index * inputWidth - (comboArray.value.length - 1) * inputWidth / 2) ?? 0;
const inputNumber = ref((new Array(comboArray.value.length)).fill(0));


// 處理滑動輸入框




// 處理出過9與小於0的問題
const rollOver = (val: number) => {
	if (val > 9) {
		return val % 10;
	} if (val < 0) {
		return val + 10
	}
	return val;
}





// 處理密碼正確
const isPass = computed(() => (inputNumber.value.toString() === comboArray.value.toString()))

// 處理動畫
const responseText = ref('')
const clickUnlockButton = () => {
	if (isPass.value) {
		responseText.value = 'correct';
		startUnlockAttempt(handlePass)
		setTimeout(() => {
			console.log('pass');

		}, 3000);
	} else {
		responseText.value = 'incorrect';
		startUnlockAttempt(handleNoPass)
	}
}


</script>

<style scoped>

</style>