/* Typescript type definitions for RenderService */

declare type Position = [x: number, y: number]

declare namespace RenderService {
	function circle(pos: Position, radius: number, color?: string): void;
	function ping(pos: Position): void;
	function line(pos1: Position, pos2: Position, color?: string): void;
	function text(pos: Position, str: string, color?: string): void;
	function log(str: string): void;
}

export as namespace RenderService;
export = RenderService;
