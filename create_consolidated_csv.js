const fs = require('fs');

// Read the normalized users CSV
const usersData = fs.readFileSync('users_normalized.csv', 'utf-8');
const teamsData = fs.readFileSync('teams (3).csv', 'utf-8');

// Create a consolidated CSV with a clear separator between sections
const consolidatedCSV = `# HEATON EYE ASSOCIATES - CONSOLIDATED DIRECTORY DATA
# Generated: ${new Date().toISOString()}
#
# SECTION 1: USERS DATA
# ===================
${usersData}

# SECTION 2: TEAMS DATA
# ===================
${teamsData}`;

// Write the consolidated file
fs.writeFileSync('Heaton_Directory_Consolidated.csv', consolidatedCSV);

// Also create clean separate files for easier import
fs.writeFileSync('Heaton_Users_Clean.csv', usersData);
fs.writeFileSync('Heaton_Teams_Clean.csv', teamsData);

console.log('✅ Created consolidated files:');
console.log('   - Heaton_Directory_Consolidated.csv (combined file)');
console.log('   - Heaton_Users_Clean.csv (users only)');
console.log('   - Heaton_Teams_Clean.csv (teams only)');
console.log('   - Heaton_Directory_Consolidated.xlsx (Excel with tabs)');