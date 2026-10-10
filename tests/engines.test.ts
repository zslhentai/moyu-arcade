import {describe,it,expect,vi,afterEach} from 'vitest';
import {slide,spawn,playable} from '../src/games/2048/engine';
import {blank,neighbors,plant,reveal,won,MINES} from '../src/games/minesweeper/engine';
import {foodFor,step,SIZE} from '../src/games/snake/engine';
import {readRecord,saveRecord} from '../src/lib/storage';
const row=(v:number[])=>[...v,...Array(12).fill(0)];
describe('2048',()=>{
 it('merges each tile only once and counts score',()=>{const r=slide(row([2,2,2,2]),'left');expect(r.board.slice(0,4)).toEqual([4,4,0,0]);expect(r.score).toBe(8);});
 it('right aligns and vertical directions work',()=>{expect(slide(row([2,0,2,4]),'right').board.slice(0,4)).toEqual([0,0,4,4]);const b=Array(16).fill(0);b[0]=2;b[4]=2;expect(slide(b,'down').board[12]).toBe(4);expect(slide(b,'up').board[0]).toBe(4);});
 it('no-op does not change board or score',()=>{const r=slide(row([2,4,8,16]),'left');expect(r.changed).toBe(false);expect(r.score).toBe(0);});
 it('spawns only in an empty slot',()=>{const b=row([2,4,8,16]);const n=spawn(b,()=>0);expect(n[4]).toBe(2);expect(n.slice(0,4)).toEqual(b.slice(0,4));});
 it('detects terminal board and available merge',()=>{const b=[2,4,2,4,4,2,4,2,2,4,2,4,4,2,4,2];expect(playable(b)).toBe(false);b[0]=4;expect(playable(b)).toBe(true);});
});
describe('Minesweeper',()=>{
 it('excludes first click and neighbors, keeps 10 mines',()=>{for(const id of [0,40,80]){const b=plant(id);expect(b.filter(c=>c.mine)).toHaveLength(MINES);[id,...neighbors(id)].forEach(i=>expect(b[i].mine).toBe(false));}});
 it('neighbors do not wrap edges',()=>expect(neighbors(0).sort((a,b)=>a-b)).toEqual([1,9,10]));
 it('flood fill reveals safe area and preserves flags',()=>{const b=blank();b[80].flag=true;const n=reveal(b,0);expect(n.filter(c=>c.open)).toHaveLength(80);expect(n[80].open).toBe(false);expect(b[0].open).toBe(false);});
 it('win requires revealing every safe cell',()=>{const b=plant(40);expect(won(b)).toBe(false);b.forEach(c=>{if(!c.mine)c.open=true;});expect(won(b)).toBe(true);});
});
describe('Snake',()=>{
 it('eating grows and wall collision ends run',()=>{expect(step([{x:1,y:1},{x:0,y:1}],'right',{x:2,y:1}).snake).toHaveLength(3);expect(step([{x:0,y:0}],'left',null).dead).toBe(true);});
 it('tail vacates unless eating',()=>{const s=[{x:1,y:1},{x:1,y:2},{x:0,y:2},{x:0,y:1}];expect(step(s,'left',{x:5,y:5}).dead).toBe(false);expect(step(s,'down',null).dead).toBe(true);});
 it('food avoids body and full board has no food',()=>{expect(foodFor([{x:0,y:0}],()=>0)).toEqual({x:1,y:0});expect(foodFor(Array.from({length:SIZE*SIZE},(_,i)=>({x:i%SIZE,y:Math.floor(i/SIZE)})))).toBeNull();});
});
describe('storage',()=>{afterEach(()=>vi.unstubAllGlobals());it('validates corrupt values',()=>{vi.stubGlobal('localStorage',{getItem:()=>'-1'});expect(readRecord('snake')).toBe(0);});it('handles blocked storage without crashing',()=>{vi.stubGlobal('localStorage',{getItem:()=>{throw Error();},setItem:()=>{throw Error();}});expect(readRecord('snake')).toBe(0);expect(saveRecord('snake',10)).toBe(false);});});
