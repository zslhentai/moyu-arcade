export type Direction = 'up' | 'down' | 'left' | 'right';
export function slide(board: number[], direction: Direction) {
  const next = [...board]; let score = 0;
  for (let line = 0; line < 4; line++) {
    const ids = Array.from({length:4}, (_,i) => direction === 'left' ? line*4+i : direction === 'right' ? line*4+3-i : direction === 'up' ? i*4+line : (3-i)*4+line);
    const values = ids.map(i => board[i]).filter(Boolean); const merged: number[] = [];
    for (let i=0; i<values.length; i++) { if(values[i] === values[i+1]) { const v=values[i]*2; merged.push(v); score+=v; i++; } else merged.push(values[i]); }
    ids.forEach((id,i) => next[id]=merged[i] || 0);
  }
  return {board: next, score, changed: next.some((v,i)=>v!==board[i])};
}
export function spawn(board: number[], random = Math.random) { const empty = board.map((v,i)=>v ? -1 : i).filter(i=>i>=0); if(!empty.length)return board; const next=[...board]; next[empty[Math.min(empty.length-1, Math.floor(random()*empty.length))]]=random()<.9 ? 2 : 4; return next; }
export function playable(board:number[]) { return (['up','down','left','right'] as Direction[]).some(d=>slide(board,d).changed); }
export function initialBoard() { return spawn(spawn(Array(16).fill(0))); }
