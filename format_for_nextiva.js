const XLSX = require('xlsx');
const fs = require('fs');

// Read the consolidated Excel file
const workbook = XLSX.readFile('Heaton_Directory_Consolidated.xlsx');
const usersSheet = workbook.Sheets['Users'];
const usersData = XLSX.utils.sheet_to_json(usersSheet);

// Function to extract phone number (DID) from phone number field
function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';
  // Remove parentheses, spaces, and format as +1-xxx-xxx-xxxx
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  if (cleaned.length >= 10) {
    const area = cleaned.slice(-10, -7);
    const exchange = cleaned.slice(-7, -4);
    const number = cleaned.slice(-4);
    return `+1-${area}-${exchange}-${number}`;
  }
  return phoneNumber;
}

// Function to clean and format team name
function formatTeam(team) {
  if (!team) return '';
  // Remove extra quotes and clean up team names
  return team.replace(/"/g, '').trim();
}

// Function to split name into parts for potential department/title mapping
function extractDepartmentFromTeam(team, role) {
  // Try to extract department from team name or role
  if (team && team.toLowerCase().includes('tech')) return 'Technology';
  if (team && team.toLowerCase().includes('front desk')) return 'Reception';
  if (team && team.toLowerCase().includes('optical')) return 'Optical';
  if (team && team.toLowerCase().includes('lasik')) return 'LASIK';
  if (team && team.toLowerCase().includes('billing')) return 'Billing';
  if (team && team.toLowerCase().includes('admin')) return 'Administration';
  if (role && role.toLowerCase().includes('user')) return 'Staff';
  return 'General';
}

// Convert users data to Nextiva format
const nextiveFormatData = usersData
  .filter(user => user.Name && user.Name.trim() !== '') // Only include users with names
  .map(user => {
    return {
      'Name': user.Name || '',
      'Email': user.Email || '',
      'Extension': user.Extension || '',
      'DID': formatPhoneNumber(user['Phone Number']),
      'Team': formatTeam(user.Team),
      'Location': user.Location || '',
      'Department': extractDepartmentFromTeam(user.Team, user.Role),
      'Job Title': user.Role || 'Staff'
    };
  });

// Create CSV header matching your requested format (with single Name column)
const headers = ['Name', 'Email', 'Extension', 'DID', 'Team', 'Location', 'Department', 'Job Title'];

// Convert to CSV format
const csvLines = [headers.join(',')];

nextiveFormatData.forEach(row => {
  const line = headers.map(header => {
    let value = row[header] || '';
    // Escape commas and quotes in CSV
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      value = `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }).join(',');
  csvLines.push(line);
});

const csvContent = csvLines.join('\n');

// Write the formatted CSV file
fs.writeFileSync('Heaton_Directory_Nextiva_Format.csv', csvContent);

console.log('✅ Created Heaton_Directory_Nextiva_Format.csv');
console.log(`   - Format: Name, Email, Extension, DID, Team, Location, Department, Job Title`);
console.log(`   - Records: ${nextiveFormatData.length} users`);
console.log(`   - Single Name column (combined first/last names)`);
console.log('');
console.log('Sample data:');
console.log('Name,Email,Extension,DID,Team,Location,Department,Job Title');
nextiveFormatData.slice(0, 3).forEach(row => {
  const line = headers.map(h => row[h] || '').join(',');
  console.log(line);
});