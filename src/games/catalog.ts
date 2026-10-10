import { lazy } from 'react';
export const games=[
 {id:'minesweeper',name:'扫雷',en:'MINESWEEPER',category:'益智',tag:'经典推理',color:'cyan',description:'每一步都是判断。找到安全区，避开隐藏的地雷。',instructions:'点击格子揭开；电脑右键插旗，手机开启「插旗模式」后点击。数字代表周围八格的地雷数。首步及相邻格始终安全。',component:lazy(()=>import('./minesweeper/Game'))},
 {id:'snake',name:'贪吃蛇',en:'SNAKE',category:'街机',tag:'反应挑战',color:'purple',description:'从一小段开始，吃掉光点，把纪录越拉越长。',instructions:'方向键 / WASD 转向；手机滑动或使用方向按钮。空格暂停。不能立即反向，撞墙或撞到自己结束。',component:lazy(()=>import('./snake/Game'))},
 {id:'2048',name:'2048',en:'MERGE & CHILL',category:'益智',tag:'数字合成',color:'yellow',description:'滑动、合并、再来一步。让数字慢慢长到 2048。',instructions:'方向键 / WASD 或手机滑动移动所有方块。相同数字合并，每回合一个方块仅合并一次。达到 2048 后可以继续挑战。',component:lazy(()=>import('./2048/Game'))}
] as const;
