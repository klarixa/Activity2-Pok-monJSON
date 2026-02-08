# Pokemon JSON Parser - Activity 02 - Discovery Challenge

Welcome to your second API integration project! This template helps you master JSON parsing and data manipulation using the Pokemon API's rich data structures.

## 🎯 Learning Objectives

By completing this activity, you will:
- Parse complex nested JSON structures
- Extract and display specific data from API responses
- Work with arrays and object traversal
- Handle concurrent API requests with Promise.all()
- Process and format large datasets efficiently
- Build a complete data visualization system

## 🚀 Getting Started

### ⚡ Quick Start (See Results in 30 Seconds!)

**IMPORTANT: This template includes WORKING CODE! You can see it in action immediately:**

1. **Navigate to this folder** in your terminal/command prompt
2. **Start a local server** (choose one):
   ```bash
   # Mac/Linux:
   python3 -m http.server 8000

   # Windows:
   python -m http.server 8000

   # Alternative using Node.js:
   npx http-server -p 8000
   ```
3. **Open your browser** to: http://localhost:8000
4. **Try the working features:**
   - "Search Pokemon" works (try "pikachu", "charizard")
   - "Random Pokemon" generates random Pokemon
   - "Show Raw JSON" displays formatted API data
   - All parsing buttons work immediately!

### 🎯 What's Already Working

**65% of the code is implemented for you:**
- ✅ Pokemon search (fully working)
- ✅ Random Pokemon generation (fully working)
- ✅ Raw JSON display (fully working)
- ✅ Stats parsing (fully working)
- ✅ Moves parsing (fully working)
- ⚠️ Types parsing (TODO for you)
- ⚠️ Pokemon comparison (TODO for you)
- ⚠️ Team builder (TODO for you)

### 📝 Your Learning Tasks

1. **First, test the working features** to understand JSON parsing patterns
2. **Then complete the TODO sections** following the examples
3. **Finally, add your own creative extensions**

## 📋 Tasks to Complete

### TODO 1: Search Pokemon (Easy)
Complete the `searchPokemon()` function to fetch and display Pokemon data.

**API Endpoint:** `https://pokeapi.co/api/v2/pokemon/{pokemon-name}`

**Success Criteria:**
- Search works with lowercase Pokemon names (e.g., "pikachu", "ditto")
- Pokemon card displays with image, name, height, and weight
- Loading state shows during API call
- Error handling works for invalid Pokemon names

### TODO 2: Random Pokemon (Easy)
Complete the `getRandomPokemon()` function to fetch a random Pokemon from the first 1010.

**Requirements:**
- Generate random ID between 1 and 1010
- Fetch Pokemon using the same pattern as searchPokemon()
- Display the result using displayPokemonCard()

### TODO 3: Raw JSON Display (Easy)
Complete the `showRawJson()` function to show formatted API responses.

**Purpose:**
- Help students understand complex JSON structures
- Practice with JSON.stringify()
- See the full data returned by the API

**Success Criteria:**
- JSON displays in formatted, readable format
- Works after any Pokemon has been fetched
- Shows helpful message if no data is available

### TODO 4: Parse Stats (Medium)
Complete the `parseStats()` function to extract and display Pokemon base stats.

**Data Structure:**
```javascript
data.stats = [
  {
    base_stat: 35,
    stat: { name: "hp" }
  },
  // ... more stats
]
```

**Success Criteria:**
- All 6 stats display (HP, Attack, Defense, Special Attack, Special Defense, Speed)
- Each stat shows both name and value
- Formatting is clean and readable

### TODO 5: Parse Moves (Medium)
Complete the `parseMoves()` function to extract and display the first 10 moves.

**Data Structure:**
```javascript
data.moves = [
  {
    move: {
      name: "thunder-shock",
      url: "..."
    }
  },
  // ... 100+ more moves
]
```

**Success Criteria:**
- First 10 moves display in a list
- Only move names shown (not URLs)
- Works with Pokemon that have fewer than 10 moves

### TODO 6: Parse Types (Medium)
Complete the `parseTypes()` function to extract and display Pokemon types with styling.

**Data Structure:**
```javascript
data.types = [
  {
    slot: 1,
    type: {
      name: "electric",
      url: "..."
    }
  }
]
```

**Success Criteria:**
- All Pokemon types display
- Each type has appropriate CSS class (e.g., `type-electric`)
- Types appear as styled badges

### TODO 7: Compare Pokemon (Challenge)
Complete the `comparePokemon()` function to fetch and display two Pokemon side-by-side.

**Requirements:**
- Fetch both Pokemon concurrently using Promise.all()
- Display both Pokemon cards in comparison view
- Show stats side-by-side for easy comparison
- Handle errors if either Pokemon is invalid

**Hint:** Use this pattern for concurrent requests:
```javascript
const [data1, data2] = await Promise.all([
  fetch(url1).then(r => r.json()),
  fetch(url2).then(r => r.json())
]);
```

### TODO 8: Build Random Team (Challenge)
Complete the `buildRandomTeam()` function to generate a team of 3 random Pokemon.

**Requirements:**
- Generate 3 unique random IDs
- Fetch all Pokemon concurrently
- Display all 3 Pokemon in a team view
- Show each Pokemon's name, image, and types

**Success Criteria:**
- Team generates quickly (all fetched at once)
- Each Pokemon is unique (no duplicates)
- Team layout is clean and organized

## 🛠 API Reference

### Pokemon API Documentation
- **Base URL:** `https://pokeapi.co/api/v2`
- **No API key required!** 🎉
- **CORS enabled** for browser requests
- **Rate limit:** Very generous for learning purposes

### Key Endpoints
```javascript
// Get Pokemon by name or ID
GET https://pokeapi.co/api/v2/pokemon/{name-or-id}

// Examples:
// https://pokeapi.co/api/v2/pokemon/pikachu
// https://pokeapi.co/api/v2/pokemon/25
```

### Response Format

**Pokemon Response** (simplified):
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "stats": [
    {
      "base_stat": 35,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    }
  ],
  "moves": [
    {
      "move": {
        "name": "mega-punch",
        "url": "https://pokeapi.co/api/v2/move/5/"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
}
```

### JSON Parsing Patterns
```javascript
// Accessing basic properties
const name = data.name;
const height = data.height;
const weight = data.weight;

// Accessing nested properties
const firstType = data.types[0].type.name;
const firstStat = data.stats[0].base_stat;
const firstMove = data.moves[0].move.name;

// Processing arrays with map()
const allTypes = data.types.map(t => t.type.name);
const allStats = data.stats.map(s => s.base_stat);
const firstTenMoves = data.moves.slice(0, 10).map(m => m.move.name);
```

## 🎨 Features Included

### User Interface
- **Modern Pokemon-themed design** with gradients
- **Responsive layout** that works on all devices
- **Loading animations** with Pokeball spinners
- **Type-based coloring** matching official Pokemon colors

### Code Structure
- **Clear TODO sections** for student completion
- **Working examples** to learn from
- **Helper functions** for display logic
- **Detailed comments** explaining each step

### Fallback System
- **Sample data** for offline practice
- **Error messages** that help debug issues
- **Loading states** for better UX

## 🧪 Testing Your Work

### Manual Testing Checklist

**Basic Functionality:**
- [ ] Search works with valid Pokemon names ("pikachu", "charizard", "ditto")
- [ ] Search handles invalid names gracefully
- [ ] Random Pokemon generates different Pokemon each time
- [ ] Raw JSON displays formatted data

**Data Parsing:**
- [ ] Stats parsing shows all 6 stats with values
- [ ] Moves parsing shows first 10 moves
- [ ] Types parsing shows colored type badges
- [ ] All parsing works with different Pokemon (try multiple!)

**Advanced Features:**
- [ ] Comparison shows two Pokemon side-by-side
- [ ] Team builder creates teams of 3 unique Pokemon
- [ ] All features show loading states
- [ ] Error handling works throughout

### Debugging Tips
1. **Open Developer Tools** (F12 in most browsers)
2. **Check Console tab** for error messages and your console.log() statements
3. **Use Network tab** to see API requests and responses
4. **Use console.log()** to inspect data structures before parsing

### Common Issues & Solutions

**Issue:** "Pokemon not found"
**Solution:** Use lowercase names ("pikachu" not "Pikachu")

**Issue:** "Cannot read property 'name' of undefined"
**Solution:** Check that the API response has the expected structure. Use optional chaining: `data?.types?.[0]?.type?.name`

**Issue:** CORS errors
**Solution:** Use a local server (Python http.server) instead of opening HTML file directly

**Issue:** Empty displays after parsing
**Solution:** Make sure you're calling the display functions and returning the HTML string

## 🚀 Extension Challenges

Ready for more? Try these bonus features:

### Beginner Extensions
- **Search history:** Save recent searches to localStorage
- **Favorite Pokemon:** Let users mark and save favorites
- **Pokemon counter:** Track how many Pokemon have been viewed

### Intermediate Extensions
- **Evolution chain:** Fetch and display evolution relationships
- **Abilities display:** Show Pokemon abilities with descriptions
- **Type effectiveness:** Display type advantages/disadvantages

### Advanced Extensions
- **Battle simulator:** Compare stats and simulate battles
- **Regional variants:** Handle Alolan/Galarian forms
- **Move details:** Fetch detailed information about specific moves
- **Team optimization:** Suggest balanced team compositions

### Creative Extensions
- **Pokemon quiz:** Guess Pokemon from silhouettes or descriptions
- **Pokedex mode:** Browse Pokemon by generation or type
- **Sound effects:** Add Pokemon cries when displaying Pokemon

## 📚 Additional Resources

### API Learning
- [Pokemon API Documentation](https://pokeapi.co/docs/v2)
- [MDN Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSON Introduction](https://www.json.org/)

### JavaScript Concepts
- **Array Methods:** Learn `map()`, `filter()`, `slice()`, `forEach()`
- **Destructuring:** `const { name, id } = pokemon;`
- **Async/Await:** How to handle asynchronous operations
- **Promise.all():** Fetch multiple resources concurrently
- **Optional Chaining:** Safely access nested properties

## 🏆 Success Criteria

Your project is complete when:
- ✅ All 8 TODO functions are implemented
- ✅ Search and random Pokemon work correctly
- ✅ All parsing functions extract the right data
- ✅ Comparison and team builder function properly
- ✅ Loading states and error handling work
- ✅ Code is clean with proper comments
- ✅ Project works on both desktop and mobile

## 🎉 Congratulations!

Once you complete this project, you'll have:
- Mastered complex JSON parsing with nested structures
- Learned to work with arrays and object traversal
- Implemented concurrent API requests with Promise.all()
- Built a complete data visualization system
- Gained confidence with real-world API data

This foundation prepares you perfectly for the next activity where we'll explore API authentication and work with multiple APIs simultaneously!

---

**Need Help?**
- Start with the working functions to understand the patterns
- Use `console.log()` to inspect data structures
- Check the Network tab in DevTools to see raw API responses
- Try the working parsing buttons to understand expected output
- Test one function at a time rather than all at once

Happy coding! ⚡✨
