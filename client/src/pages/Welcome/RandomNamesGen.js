const syllables = [
    "ar", "ca", "el", "fa", "ga", "la", "ma", "na", "ra", "ta",
    "an", "ce", "en", "fi", "ho", "ka", "li", "mo", "ne", "ro"
  ];

export function generateRandomNames() {
    const numSyllables = Math.floor(Math.random() * 2) + 2;
    let name = "";
  
    for (let i = 0; i < numSyllables; i++) {
      const randomSyllable = syllables[Math.floor(Math.random() * syllables.length)];
      name += randomSyllable;
    }
  
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

