export const WIDTH=9, MINES=10;
export type Cell={mine:boolean;open:boolean;flag:boolean;near:number};
export function neighbors(id:number) { const ids:number[]=[];const x=id%WIDTH,y=Math.floor(id/WIDTH);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if((dx||dy)&&nx>=0&&nx<WIDTH&&ny>=0&&ny<WIDTH)ids.push(ny*WIDTH+nx);}return ids; }
export function blank():Cell[] { return Array.from({length:WIDTH*WIDTH},()=>({mine:false,open:false,flag:false,near:0})); }
export function plant(safe:number, random=Math.random):Cell[] { const cells=blank();const excluded=new Set([safe,...neighbors(safe)]); const ids=cells.map((_,i)=>i).filter(i=>!excluded.has(i)); for(let i=ids.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}ids.slice(0,MINES).forEach(i=>cells[i].mine=true);cells.forEach((c,i)=>c.near=neighbors(i).filter(n=>cells[n].mine).length);return cells; }
export function reveal(cells:Cell[],id:number):Cell[] { if(cells[id].flag||cells[id].open)return cells;const next=cells.map(c=>({...c}));const queue=[id];while(queue.length){const i=queue.pop()!;const c=next[i];if(c.open||c.flag)continue;c.open=true;if(!c.mine&&c.near===0)queue.push(...neighbors(i));}return next; }
export function won(cells:Cell[]) { return cells.every(c=>c.mine||c.open); }
