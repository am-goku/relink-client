let array = [
  { keyId: 1, name: "Object 1" },
  { keyId: 2, name: "Object 2" },
  { keyId: 3, name: "Object 3" },
  { keyId: 4, name: "Object 4" },
];
let keyIdToMove = 4;

// Create a Map to store keyId to index mapping
const keyIdToIndexMap = new Map();
for (let i = 0; i < array.length; i++) {
  keyIdToIndexMap.set(array[i].keyId, i);
}

// Find the index in the array based on the keyId and move it to the beginning
const index = keyIdToIndexMap.get(keyIdToMove);
if (index !== undefined) {
  // Swap the object at the index with the first element in the array
  [array[0], array[index]] = [array[index], array[0]];
}

console.log(array); // Output the modified array
