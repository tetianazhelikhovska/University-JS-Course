function generateArray(length, sparse = false) {
  const arr = new Array(length);
  for (let i = 0; i < length; i++) {
    if (sparse && i % 10 === 0) {
      arr[i] = undefined;
    } else {
      arr[i] = Math.floor(Math.random() * 1000);
    }
  }
  return arr;
}

const denseArray = generateArray(100);
const sparseArray = generateArray(100, true);

console.log("====== ПРИКЛАД НА ЩІЛЬНОМУ МАСИВІ ======");
console.log(SortingLibrary.bubbleSort(denseArray, true));
console.log(SortingLibrary.selectionSort(denseArray, true));
console.log(SortingLibrary.insertionSort(denseArray, true));
console.log(SortingLibrary.shellSort(denseArray, true));
console.log(SortingLibrary.quickSort(denseArray, true));

console.log("\n====== ПРИКЛАД НА РОЗРІДЖЕНОМУ МАСИВІ ======");
SortingLibrary.bubbleSort(sparseArray, false);
SortingLibrary.selectionSort(sparseArray, false);
SortingLibrary.insertionSort(sparseArray, false);
SortingLibrary.shellSort(sparseArray, false);
SortingLibrary.quickSort(sparseArray, false);
