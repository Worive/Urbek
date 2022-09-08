import {writable} from 'svelte/store';

export default writable(new Map<number, Object>);

