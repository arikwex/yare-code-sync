/* Typescript type definitions for RenderService */

declare type Position = [x: number, y: number]

declare interface Positioned {
	position: Position
}

declare namespace RenderService {
	function circle(pos: Position | Positioned, radius: number, color?: string): void;
	function ping(pos: Position | Positioned): void;
	function line(pos1: Position | Positioned, pos2: Position | Positioned, color?: string): void;
	function text(pos: Position | Positioned, str: string, color?: string): void;
	function log(str: string): void;
}

export as namespace RenderService;
export = RenderService;
