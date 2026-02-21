const fs = require('fs');
const path = require('path');

const files = [
  'src/components/layout/navbar.tsx',
  'src/components/layout/toolbar.tsx',
  'src/components/layout/topbar.tsx',
  'src/components/chat/message.tsx',
  'src/pages/auth/login.tsx',
  'src/pages/chat-box/index.tsx',
  'src/pages/reports/index.tsx',
  'src/pages/settings/views/company-hub.tsx',
  'src/pages/settings/views/preferences-hub.tsx',
  'src/pages/settings/views/user-hub.tsx',
  'src/pages/settings/views/channels-hub.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Neutral updates
  content = content.replace(/bg-indigo-50 dark:bg-neutral-900 border-indigo-200 dark:border-indigo-500\/30/g, 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700');
  content = content.replace(/text-indigo-600 dark:text-indigo-400 bg-indigo-50/g, 'text-neutral-900 dark:text-neutral-100 bg-neutral-100');
  
  // Login page specific
  if (file.includes('login.tsx')) {
    content = content.replace(/ring-indigo-500/g, 'ring-neutral-400 dark:ring-neutral-500');
    content = content.replace(/text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300/g, 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200');
    content = content.replace(/bg-indigo-600 hover:bg-indigo-700 text-white font-medium active:bg-indigo-500/g, 'bg-green-600 hover:bg-green-700 text-white font-medium active:bg-green-800');
  }

  // Reports
  if (file.includes('reports/index.tsx')) {
    content = content.replace(/text-indigo-600 dark:text-indigo-500/g, 'text-neutral-900 dark:text-neutral-100');
    content = content.replace(/bg-indigo-400/g, 'bg-neutral-300 dark:bg-neutral-700');
  }

  // Chat Box
  if (file.includes('chat-box/index.tsx')) {
    content = content.replace(/ring-indigo-400/g, 'ring-neutral-400 dark:ring-neutral-500');
    content = content.replace(/text-indigo-600 dark:text-indigo-500/g, 'text-neutral-900 dark:text-neutral-100');
    content = content.replace(/bg-indigo-400/g, 'bg-neutral-300 dark:bg-neutral-700');
    content = content.replace(/bg-indigo-600/g, 'bg-green-600');
    content = content.replace(/hover:bg-indigo-500/g, 'hover:bg-green-500');
  }

  // Message
  if (file.includes('message.tsx')) {
    content = content.replace(/group-odd:bg-indigo-600 group-odd:text-white/g, 'group-odd:bg-neutral-200 dark:group-odd:bg-neutral-700 group-odd:text-neutral-900 dark:group-odd:text-neutral-100');
  }

  // Toolbar
  if (file.includes('toolbar.tsx')) {
    content = content.replace(/focus:ring-indigo-400/g, 'focus:ring-neutral-400 dark:focus:ring-neutral-500');
  }

  // Navbar
  if (file.includes('navbar.tsx')) {
    content = content.replace(/text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-neutral-900 border-indigo-200 dark:border-indigo-500\/30/g, 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700');
    content = content.replace(/text-rose-600 dark:text-indigo-400\/100/g, 'text-neutral-900 dark:text-neutral-100');
    content = content.replace(/bg-indigo-50 dark:bg-indigo-900\/50/g, 'bg-neutral-100 dark:bg-neutral-800');
  }

  // Generic settings hub (replace sky/indigo completely with neutral where they are bg, text, etc. and green where they are buttons)
  if (file.includes('settings')) {
    // Buttons (Adicionar/Salvar)
    content = content.replace(/bg-sky-500 hover:bg-sky-600/g, 'bg-green-600 hover:bg-green-700');
    
    // Gradient headers
    content = content.replace(/from-sky-600 to-indigo-700/g, 'from-neutral-800 to-neutral-900 dark:from-neutral-800 dark:to-neutral-900');
    content = content.replace(/from-purple-600 to-indigo-700/g, 'from-neutral-800 to-neutral-900 dark:from-neutral-800 dark:to-neutral-900');
    content = content.replace(/shadow-sky-500\/20/g, 'shadow-neutral-900/10');
    content = content.replace(/shadow-purple-500\/20/g, 'shadow-neutral-900/10');
    content = content.replace(/text-sky-200/g, 'text-neutral-300');
    content = content.replace(/text-sky-100/g, 'text-neutral-300');

    // Generic highlights (active items, icons bg)
    content = content.replace(/bg-indigo-50 dark:bg-indigo-900\/20/g, 'bg-neutral-100 dark:bg-neutral-800');
    content = content.replace(/text-indigo-500/g, 'text-neutral-600 dark:text-neutral-300');
    content = content.replace(/focus:ring-sky-500/g, 'focus:ring-neutral-400 dark:focus:ring-neutral-600');
    
    // Toggles / Radio / Selectors
    content = content.replace(/bg-sky-500 text-white/g, 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900');
    content = content.replace(/bg-sky-500 shadow-\[0_0_8px_rgba\(14,165,233,0\.5\)\]/g, 'bg-neutral-800 dark:bg-neutral-200 shadow-sm');
    content = content.replace(/bg-sky-500/g, 'bg-neutral-800 dark:bg-neutral-200');
    content = content.replace(/bg-sky-400/g, 'bg-neutral-700 dark:bg-neutral-300');
    content = content.replace(/border-sky-500 bg-sky-50\/50 dark:bg-sky-500\/10/g, 'border-neutral-500 bg-neutral-100 dark:bg-neutral-800');
    content = content.replace(/bg-sky-50 dark:bg-sky-900\/10 border-sky-200 dark:border-sky-800/g, 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600');
    content = content.replace(/text-sky-700 dark:text-sky-300/g, 'text-neutral-900 dark:text-neutral-100');
    content = content.replace(/text-sky-700 dark:text-sky-400/g, 'text-neutral-900 dark:text-neutral-100');
    content = content.replace(/bg-sky-50 dark:bg-sky-900\/20/g, 'bg-neutral-100 dark:bg-neutral-800');
    content = content.replace(/text-sky-500/g, 'text-neutral-700 dark:text-neutral-300');
    content = content.replace(/bg-sky-500\/10/g, 'bg-neutral-900\/5 dark:bg-neutral-100\/5');
    
    // Channels
    content = content.replace(/bg-sky-100 dark:bg-sky-900\/30 border-sky-300 dark:border-sky-700/g, 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700');
    content = content.replace(/bg-indigo-600/g, 'bg-neutral-800 dark:bg-neutral-200');
  }

  fs.writeFileSync(file, content, 'utf8');
});
console.log('Done replacing colors.');
