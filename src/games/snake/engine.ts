import type { Direction } from '../2048/engine';
export const SIZE=16;
export type Point={x:number;y:number};
export const vectors: Record<Direction,Point>={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
export const opposite: Record<Direction,Direction>={up:'down',down:'up',left:'right',right:'left'};
export function foodFor(snake:Point[], random=Math.random):Point|null { const free:Point[]=[]; for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)if(!snake.some(p=>p.x===x&&p.y===y))free.push({x,y}); return free[Math.min(free.length-1,Math.floor(random()*free.length))] || null; }
export function step(snake:Point[],direction:Direction,food:Point|null) { const v=vectors[direction],head={x:snake[0].x+v.x,y:snake[0].y+v.y}; const ate=!!food&&head.x===food.x&&head.y===food.y; const body=ate?snake:snake.slice(0,-1); const dead=head.x<0||head.y<0||head.x>=SIZE||head.y>=SIZE||body.some(p=>p.x===head.x&&p.y===head.y); return {snake:dead?snake:[head,...body],dead,ate}; }
