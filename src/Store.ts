import {CSV} from "@lv00/toolkit"
import { writable } from "svelte/store";



export const report = writable<CSV>(undefined)