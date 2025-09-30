const XLSX = require('xlsx');
const fs = require('fs');

// Read the users CSV
const usersData = fs.readFileSync('users_normalized.csv', 'utf-8');
const usersLines = usersData.split('\n').filter(line => line.trim() !== '');

// Read the teams CSV
const teamsData = fs.readFileSync('teams (3).csv', 'utf-8');
const teamsLines = teamsData.split('\n').filter(line => line.trim() !== '');

// Parse CSV data
function parseCSV(lines) {
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim()) {
      // Simple CSV parsing - handles quoted fields
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }
  }

  return rows;
}

// Parse both datasets
const usersRows = parseCSV(usersLines);
const teamsRows = parseCSV(teamsLines);

// Create workbook
const workbook = XLSX.utils.book_new();

// Add users worksheet
const usersWorksheet = XLSX.utils.json_to_sheet(usersRows);
XLSX.utils.book_append_sheet(workbook, usersWorksheet, 'Users');

// Add teams worksheet
const teamsWorksheet = XLSX.utils.json_to_sheet(teamsRows);
XLSX.utils.book_append_sheet(workbook, teamsWorksheet, 'Teams');

// Write the Excel file
XLSX.writeFile(workbook, 'Heaton_Directory_Consolidated.xlsx');

console.log('✅ Created Heaton_Directory_Consolidated.xlsx with:');
console.log(`   - Users tab: ${usersRows.length} users`);
console.log(`   - Teams tab: ${teamsRows.length} teams`);