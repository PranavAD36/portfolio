const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'app/favicon.ico',
  'app/icon.svg',
  'public/favicon.ico'
];

console.log('Attempting to delete corrupted icon files...\n');

filesToDelete.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✓ Deleted: ${file}`);
    } else {
      console.log(`  (not found): ${file}`);
    }
  } catch (err) {
    console.log(`✗ Error deleting ${file}: ${err.message}`);
  }
});

console.log('\nRemaining icon/favicon files:');
['app', 'public'].forEach(dir => {
  const files = fs.readdirSync(dir);
  const iconFiles = files.filter(f => f.includes('icon') || f.includes('favicon'));
  if (iconFiles.length > 0) {
    iconFiles.forEach(f => console.log(`  ${dir}/${f}`));
  }
});
