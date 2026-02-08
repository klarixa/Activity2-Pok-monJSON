// Pokemon JSON Parser - Activity 02
// Discovery Challenge: Master JSON parsing and API integration through exploration!

// API Configuration
const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';

// DOM Elements - Already connected for you
const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const showRawBtn = document.getElementById('showRawBtn');
const parseStatsBtn = document.getElementById('parseStatsBtn');
const parseMovesBtn = document.getElementById('parseMovesBtn');
const parseTypesBtn = document.getElementById('parseTypesBtn');
const randomPokemonBtn = document.getElementById('randomPokemonBtn');
const compareBtn = document.getElementById('compareBtn');
const teamBuilderBtn = document.getElementById('teamBuilderBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const fallback = document.getElementById('fallback');

// Global variables - You'll use these to store API responses
let currentPokemonData = null;
let teamMembers = [];

// Sample fallback data for offline practice
const samplePokemonData = {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    types: [{ type: { name: "electric" } }],
    stats: [
        { base_stat: 35, stat: { name: "hp" } },
        { base_stat: 55, stat: { name: "attack" } },
        { base_stat: 40, stat: { name: "defense" } },
        { base_stat: 50, stat: { name: "special-attack" } },
        { base_stat: 50, stat: { name: "special-defense" } },
        { base_stat: 90, stat: { name: "speed" } }
    ],
    moves: [
        { move: { name: "thunder-shock" } },
        { move: { name: "quick-attack" } },
        { move: { name: "thunderbolt" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }
};

// Event Listeners - Study this pattern for connecting HTML to JavaScript
searchBtn.addEventListener('click', () => searchPokemon(pokemonInput.value));
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon(pokemonInput.value);
});

// Quick access buttons - Examine how data attributes work
document.querySelectorAll('.pokemon-btn').forEach(btn => {
    btn.addEventListener('click', () => searchPokemon(btn.dataset.pokemon));
});

// JSON parsing buttons - You'll implement these functions
showRawBtn.addEventListener('click', showRawJSON);
parseStatsBtn.addEventListener('click', parseStatsOnly);
parseMovesBtn.addEventListener('click', parseMovesOnly);
parseTypesBtn.addEventListener('click', parseTypesOnly);

// Advanced feature buttons - Challenge yourself with these
randomPokemonBtn.addEventListener('click', getRandomPokemon);
compareBtn.addEventListener('click', compareTwoPokemon);
teamBuilderBtn.addEventListener('click', buildRandomTeam);

// Initialize sample JSON display - Study this structure!
document.getElementById('sampleJson').textContent = JSON.stringify(samplePokemonData, null, 2);

// Utility Functions
function showLoading() {
    loading.classList.remove('hidden');
    results.classList.add('hidden');
    fallback.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
    results.classList.remove('hidden');
}

function showError(message) {
    hideLoading();
    results.innerHTML = `
        <div class="error-display">
            <h2>⚠️ Oops!</h2>
            <p>${message}</p>
            <p>Try searching for: pikachu, charizard, or any Pokemon name!</p>
        </div>
    `;
}

// TODO 1: Pokemon Search Function (Easy)
// Complete the searchPokemon() function to fetch and display Pokemon data

async function searchPokemon(pokemonName) {
    if (!pokemonName || pokemonName.trim() === '') {
        showError('Please enter a Pokemon name or ID!');
        return;
    }

    showLoading();

    const cleanName = String(pokemonName).toLowerCase().trim();

    try {
        const response = await fetch(`${POKEMON_API_BASE}/pokemon/${cleanName}`);

        if (!response.ok) {
            throw new Error(`Pokemon "${pokemonName}" not found.`);
        }

        const data = await response.json();
        currentPokemonData = data;
        displayPokemonCard(data);
        pokemonInput.value = '';

    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        showError(`Could not find Pokemon "${pokemonName}". Check the spelling or try a different name!`);
    }
}

// BONUS TODO: Random Pokemon Generator (Easy - Optional)
async function getRandomPokemon() {
    showLoading();

    try {
        const randomId = Math.floor(Math.random() * 1010) + 1;
        await searchPokemon(randomId.toString());

    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
        showError('Could not fetch random Pokemon. Please try again!');
    }
}

// TODO 2: JSON Display Function (Medium)
function showRawJSON() {
    if (!currentPokemonData) {
        showError('No Pokemon data available. Search for a Pokemon first!');
        return;
    }

    const formattedJson = JSON.stringify(currentPokemonData, null, 2);
    const propertyCount = Object.keys(currentPokemonData).length;

    results.innerHTML = `
        <div class="json-display">
            <h2>Raw JSON for ${currentPokemonData.name.toUpperCase()}</h2>
            <div class="json-meta">
                <span><strong>ID:</strong> ${currentPokemonData.id}</span>
                <span><strong>Properties:</strong> ${propertyCount}</span>
                <span><strong>Size:</strong> ${(formattedJson.length / 1024).toFixed(2)} KB</span>
            </div>
            <pre><code>${formattedJson}</code></pre>
        </div>
    `;
}

// TODO 3: Stats Parser Function (Medium)
// Complete the parseStatsOnly() function to extract and display Pokemon stats
//
// Success Criteria:
// - Extract the stats array from currentPokemonData.stats
// - Process each stat to get name and value
// - Calculate total stats and average
// - Display stats with visual progress bars
// - Find highest and lowest stats
//
// HINTS:
// - Each stat has: { base_stat: number, stat: { name: string } }
// - Use Array.map() to transform stat objects
// - Use Array.reduce() to calculate totals
// - Replace hyphens in stat names with spaces
// - Create visual bars based on percentage (255 is max stat)
//
// EXAMPLE SOLUTION PATTERN:
// const stats = currentPokemonData.stats;
// const processedStats = stats.map(stat => ({
//   name: stat.stat.name.replace('-', ' ').toUpperCase(),
//   value: stat.base_stat
// }));
// const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

function parseStatsOnly() {
    if (!currentPokemonData) {
        showError('No Pokemon data available. Search for a Pokemon first!');
        return;
    }

    try {
        // 1. Extract and process stats
        const stats = currentPokemonData.stats.map(s => ({
            name: s.stat.name.replace('-', ' ').toUpperCase(),
            value: s.base_stat
        }));

        // 2. Calculate calculations
        const total = stats.reduce((sum, s) => sum + s.value, 0);
        const average = (total / stats.length).toFixed(1);

        // 3. Find Extremes
        const highestStat = stats.reduce((prev, curr) => prev.value > curr.value ? prev : curr);
        const lowestStat = stats.reduce((prev, curr) => prev.value < curr.value ? prev : curr);

        // 4. Generate HTML
        const statRows = stats.map(stat => {
            const percentage = Math.min((stat.value / 255) * 100, 100);
            return `
                <div class="stat-row" style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem; font-weight: 600; color: #4a5568;">
                        <span>${stat.name}</span>
                        <span>${stat.value}</span>
                    </div>
                    <div style="background: #edf2f7; height: 10px; border-radius: 5px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${percentage}%; height: 100%; border-radius: 5px; transition: width 0.5s ease-out;"></div>
                    </div>
                </div>
            `;
        }).join('');

        results.innerHTML = `
            <div class="stats-analysis">
                <h2 style="margin-bottom: 1.5rem; color: #2d3748;">📊 Base Stats Analysis: ${currentPokemonData.name.toUpperCase()}</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 12px; border-left: 4px solid #667eea; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase;">Total</p>
                        <h3 style="font-size: 1.5rem;">${total}</h3>
                    </div>
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 12px; border-left: 4px solid #48bb78; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase;">Average</p>
                        <h3 style="font-size: 1.5rem;">${average}</h3>
                    </div>
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 12px; border-left: 4px solid #f6ad55; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase;">Highest</p>
                        <h3 style="font-size: 1.2rem;">${highestStat.name} (${highestStat.value})</h3>
                    </div>
                    <div style="background: #f7fafc; padding: 1rem; border-radius: 12px; border-left: 4px solid #f56565; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase;">Lowest</p>
                        <h3 style="font-size: 1.2rem;">${lowestStat.name} (${lowestStat.value})</h3>
                    </div>
                </div>

                <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    ${statRows}
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error parsing stats:', error);
        showError('Could not parse Pokemon stats.');
    }
}

// BONUS TODO: Moves Parser (Medium - Optional)
function parseMovesOnly() {
    if (!currentPokemonData) {
        showError('No Pokemon data available. Search for a Pokemon first!');
        return;
    }

    try {
        // 1. Extract and slice moves (limit to 20)
        const allMoves = currentPokemonData.moves;
        const displayedMoves = allMoves.slice(0, 20).map(m => {
            return m.move.name.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        });

        // 2. Create the movement list HTML
        const movesHTML = displayedMoves.map(move => `
            <div style="background: #f7fafc; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.9rem; font-weight: 600; color: #4a5568; display: flex; align-items: center;">
                <span style="color: #667eea; margin-right: 0.5rem;">•</span> ${move}
            </div>
        `).join('');

        results.innerHTML = `
            <div class="moves-display">
                <h2 style="margin-bottom: 0.5rem; color: #2d3748;">⚔️ Move Set: ${currentPokemonData.name.toUpperCase()}</h2>
                <p style="color: #718096; margin-bottom: 1.5rem;">Showing ${displayedMoves.length} of ${allMoves.length} total moves</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;">
                    ${movesHTML}
                </div>

                ${allMoves.length > 20 ? `
                    <p style="margin-top: 2rem; text-align: center; color: #a0aec0; font-style: italic; border-top: 1px solid #edf2f7; padding-top: 1rem;">
                        ...and ${allMoves.length - 20} more moves available in the game!
                    </p>
                ` : ''}
            </div>
        `;

    } catch (error) {
        console.error('Error parsing moves:', error);
        showError('Could not parse Pokemon moves.');
    }
}

// BONUS TODO: Types Parser (Medium - Optional)
function parseTypesOnly() {
    if (!currentPokemonData) {
        showError('No Pokemon data available. Search for a Pokemon first!');
        return;
    }

    try {
        // 1. Extract types
        const types = currentPokemonData.types;

        // 2. Map to HTML badges
        const typeBadges = types.map(t => {
            const typeName = t.type.name;
            return `
                <div class="type-badge-container" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                    <span class="type-badge type-${typeName}" style="
                        display: inline-block;
                        padding: 0.75rem 2rem;
                        border-radius: 50px;
                        color: white;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                        font-size: 1.1rem;
                        min-width: 140px;
                        text-align: center;
                    ">
                        ${typeName}
                    </span>
                    <span style="font-size: 0.8rem; color: #718096; font-weight: 600;">
                        ${t.slot === 1 ? 'PRIMARY' : 'SECONDARY'}
                    </span>
                </div>
            `;
        }).join('');

        results.innerHTML = `
            <div class="types-display" style="text-align: center; padding: 1rem;">
                <h2 style="margin-bottom: 2rem; color: #2d3748;">🎭 Type Analysis: ${currentPokemonData.name.toUpperCase()}</h2>
                
                <div style="display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; margin-bottom: 3rem;">
                    ${typeBadges}
                </div>

                <div style="background: #f7fafc; padding: 2rem; border-radius: 15px; border: 1px dashed #cbd5e0; max-width: 600px; margin: 0 auto;">
                    <h3 style="color: #4a5568; margin-bottom: 1rem; font-size: 1.1rem;">💡 Type Insight</h3>
                    <p style="color: #718096; line-height: 1.6;">
                        ${currentPokemonData.name.toUpperCase()} is a <strong>${types.map(t => t.type.name).join('/')}</strong> type Pokemon. 
                        This unique composition determines its strengths and weaknesses in battle!
                    </p>
                    <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
                        <span style="font-size: 0.8rem; background: #ebf8ff; color: #3182ce; padding: 0.25rem 0.75rem; border-radius: 4px;">ID: #${currentPokemonData.id}</span>
                        <span style="font-size: 0.8rem; background: #faf5ff; color: #805ad5; padding: 0.25rem 0.75rem; border-radius: 4px;">Generation I-IX</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error parsing types:', error);
        showError('Could not parse Pokemon types.');
    }
}

// TODO 4: Concurrent API Calls (Hard)
async function compareTwoPokemon() {
    const pokemon1 = prompt('Enter first Pokemon name:');
    const pokemon2 = prompt('Enter second Pokemon name:');

    if (!pokemon1 || !pokemon2) {
        showError('Please enter both Pokemon names to compare!');
        return;
    }

    if (pokemon1.toLowerCase() === pokemon2.toLowerCase()) {
        showError('Please enter two different Pokemon names!');
        return;
    }

    showLoading();

    try {
        // 1. Fetch both simultaneously with Promise.all
        const fetchPokemon = (name) => fetch(`${POKEMON_API_BASE}/pokemon/${name.toLowerCase().trim()}`).then(r => {
            if (!r.ok) throw new Error(`Pokemon ${name} not found`);
            return r.json();
        });

        const [data1, data2] = await Promise.all([
            fetchPokemon(pokemon1),
            fetchPokemon(pokemon2)
        ]);

        // 2. Compare stats
        const getTotalBase = (data) => data.stats.reduce((sum, s) => sum + s.base_stat, 0);
        const total1 = getTotalBase(data1);
        const total2 = getTotalBase(data2);

        const overallWinner = total1 > total2 ? data1.name : (total2 > total1 ? data2.name : 'Tie');

        // 3. Display Comparison
        displayComparison(data1, data2);

        // 4. Add Stat Analysis (Bonus)
        const analysisDiv = document.createElement('div');
        analysisDiv.style.marginTop = '2rem';
        analysisDiv.style.textAlign = 'center';
        analysisDiv.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                <h3 style="margin-bottom: 1rem; color: #2d3748;">📊 Battle Analysis</h3>
                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <div>
                        <p style="font-size: 0.8rem; color: #718096;">${data1.name.toUpperCase()}</p>
                        <p style="font-size: 1.5rem; font-weight: 700; color: #667eea;">${total1}</p>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #cbd5e0; align-self: center;">VS</div>
                    <div>
                        <p style="font-size: 0.8rem; color: #718096;">${data2.name.toUpperCase()}</p>
                        <p style="font-size: 1.5rem; font-weight: 700; color: #f56565;">${total2}</p>
                    </div>
                </div>
                <div style="font-weight: 700; background: #f0fff4; color: #276749; padding: 0.75rem; border-radius: 8px; border: 1px solid #c6f6d5;">
                    👑 WINNER: ${overallWinner.toUpperCase()}
                </div>
            </div>
        `;
        results.appendChild(analysisDiv);

    } catch (error) {
        console.error('Error comparing Pokemon:', error);
        showError('Could not compare Pokemon. Check that both names are correct!');
    }
}

// TODO 5: Team Generation System (Hard)
async function buildRandomTeam() {
    showLoading();

    try {
        const teamSize = 6;
        const randomIds = [];

        // 1. Generate unique random IDs
        while (randomIds.length < teamSize) {
            const id = Math.floor(Math.random() * 1010) + 1;
            if (!randomIds.includes(id)) {
                randomIds.push(id);
            }
        }

        // 2 & 3. Create fetch promises and fetch all concurrently
        const teamData = await Promise.all(
            randomIds.map(id =>
                fetch(`${POKEMON_API_BASE}/pokemon/${id}`).then(r => r.json())
            )
        );

        // 4. Store in teamMembers array
        teamMembers = teamData;

        // 5. Use displayTeam helper to show the team
        displayTeam(teamData);

        // 6. Bonus: Team Analysis (Coverage & Power)
        const allTypes = [...new Set(teamData.flatMap(p => p.types.map(t => t.type.name)))];
        const avgTotalStat = (teamData.reduce((sum, p) =>
            sum + p.stats.reduce((sSum, s) => sSum + s.base_stat, 0), 0) / teamSize).toFixed(0);

        const analysisDiv = document.createElement('div');
        analysisDiv.style.marginTop = '2rem';
        analysisDiv.innerHTML = `
            <div style="background: #f7fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; animation: slideIn 0.5s ease-out;">
                <h3 style="margin-bottom: 1rem; color: #2d3748; text-align: center;">📈 Team Analytics</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase; margin-bottom: 0.25rem;">Average Power</p>
                        <h4 style="font-size: 1.25rem; color: #667eea; font-weight: 700;">${avgTotalStat}</h4>
                    </div>
                    <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;">
                        <p style="font-size: 0.8rem; color: #718096; text-transform: uppercase; margin-bottom: 0.25rem;">Type Coverage</p>
                        <h4 style="font-size: 1.25rem; color: #48bb78; font-weight: 700;">${allTypes.length} Types</h4>
                    </div>
                </div>
                <div style="margin-top: 1.25rem; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
                    ${allTypes.map(t => `<span class="type-badge type-${t}" style="font-size: 0.7rem; padding: 0.2rem 0.6rem; border-radius: 4px; color: white;">${t.toUpperCase()}</span>`).join('')}
                </div>
            </div>
        `;
        results.appendChild(analysisDiv);

    } catch (error) {
        console.error('Error building team:', error);
        showError('Could not build random team. Please try again!');
    }
}

// Helper Functions (Already Complete - Use These!)

function displayPokemonCard(pokemon) {
    hideLoading();

    const types = pokemon.types.map(type =>
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    ).join(' ');

    const stats = pokemon.stats.map(stat =>
        `<div class="stat-card">
            <h4>${stat.stat.name.replace('-', ' ').toUpperCase()}</h4>
            <p>${stat.base_stat}</p>
        </div>`
    ).join('');

    results.innerHTML = `
        <div class="pokemon-card">
            <h2>#${pokemon.id} ${pokemon.name}</h2>
            <div class="pokemon-image">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Types:</strong> ${types}</p>
            </div>
            <div class="pokemon-stats">
                ${stats}
            </div>
        </div>
    `;
}

function displayTeam(team) {
    hideLoading();

    const teamHTML = team.map(pokemon =>
        `<div class="team-member">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h4>${pokemon.name}</h4>
            <p>ID: ${pokemon.id}</p>
            <p>Type: ${pokemon.types[0].type.name}</p>
        </div>`
    ).join('');

    results.innerHTML = `
        <div class="team-display">
            <h2>🏆 Your Random Pokemon Team</h2>
            <div class="team-container">
                ${teamHTML}
            </div>
            <button onclick="buildRandomTeam()" class="btn primary" style="margin-top: 1rem;">
                🎲 Generate New Team
            </button>
        </div>
    `;
}

function displayComparison(pokemon1, pokemon2) {
    hideLoading();

    results.innerHTML = `
        <div class="comparison-display">
            <h2>⚔️ Pokemon Comparison</h2>
            <div class="comparison-container">
                <div class="comparison-card">
                    <h3>${pokemon1.name}</h3>
                    <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}">
                    <p>ID: ${pokemon1.id}</p>
                    <p>Height: ${pokemon1.height / 10}m</p>
                    <p>Weight: ${pokemon1.weight / 10}kg</p>
                </div>
                <div class="comparison-card">
                    <h3>${pokemon2.name}</h3>
                    <img src="${pokemon2.sprites.front_default}" alt="${pokemon2.name}">
                    <p>ID: ${pokemon2.id}</p>
                    <p>Height: ${pokemon2.height / 10}m</p>
                    <p>Weight: ${pokemon2.weight / 10}kg</p>
                </div>
            </div>
        </div>
    `;
}