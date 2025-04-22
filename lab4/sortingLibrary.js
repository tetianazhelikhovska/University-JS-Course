const SortingLibrary = (() => {
  function logStats(name, comparisons, moves, hasUndefined) {
    console.log(`\n--- ${name} ---`);
    console.log(`Порівнянь: ${comparisons}`);
    console.log(`Переміщень/обмінів: ${moves}`);
    if (hasUndefined) {
      console.warn("У масиві присутні елементи undefined (розріджений масив). Вони були пропущені.");
    }
  }

  function createComparator(ascending) {
    return ascending
      ? (a, b) => a > b
      : (a, b) => a < b;
  }

  function filterSparseArray(arr) {
    const hasUndefined = arr.some(v => v === undefined);

    return arr.filter(v => v !== undefined), hasUndefined;
  }


  function sortArray(array, algorithm, ascending = true) {
    let comparisons = 0, moves = 0;
    let arr = [...array];
    const compare = createComparator(ascending);
    const hasUndefined = arr.some(v => v === undefined);
    arr = arr.filter(v => v !== undefined); 

    algorithm(arr, compare, (comp) => { comparisons++; }, (move) => { moves++; });

    logStats(algorithm.name, comparisons, moves, hasUndefined);
    return arr;
  }

  function bubbleSort(arr, compare, countComparisons, countMoves) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        countComparisons();
        if (compare(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          countMoves();
        }
      }
    }
  }

  function selectionSort(arr, compare, countComparisons, countMoves) {
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        countComparisons();
        if (compare(arr[minIdx], arr[j])) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        countMoves();
      }
    }
  }

  function insertionSort(arr, compare, countComparisons, countMoves) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && compare(arr[j], key)) {
        countComparisons();
        arr[j + 1] = arr[j];
        j--;
        countMoves();
      }
      countComparisons();
      arr[j + 1] = key;
    }
  }

  function shellSort(arr, compare, countComparisons, countMoves) {
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i];
        let j;
        for (j = i; j >= gap && compare(arr[j - gap], temp); j -= gap) {
          countComparisons();
          arr[j] = arr[j - gap];
          countMoves();
        }
        countComparisons();
        arr[j] = temp;
      }
    }
  }

  function quickSort(arr, compare, countComparisons, countMoves) {
    function partition(items, left, right) {
      const pivot = items[Math.floor((left + right) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
        while (compare(pivot, items[i])) {
          i++;
          countComparisons();
        }
        countComparisons();
        while (compare(items[j], pivot)) {
          j--;
          countComparisons();
        }
        countComparisons();
        if (i <= j) {
          [items[i], items[j]] = [items[j], items[i]];
          countMoves();
          i++;
          j--;
        }
      }
      return i;
    }

    function quickSortRecursive(items, left, right) {
      if (items.length > 1) {
        const index = partition(items, left, right);
        if (left < index - 1) {
          quickSortRecursive(items, left, index - 1);
        }
        if (index < right) {
          quickSortRecursive(items, index, right);
        }
      }
    }

    quickSortRecursive(arr, 0, arr.length - 1);
  }

  return {
    bubbleSort,
    selectionSort,
    insertionSort,
    shellSort,
    quickSort,
    sortArray 
  };
})();


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

// Генерація масивів
const denseArray = generateArray(100); // Щільний масив
const sparseArray = generateArray(100, true); // Розріджений масив

// Демонстрація на щільному масиві
console.log("====== ПРИКЛАД НА ЩІЛЬНОМУ МАСИВІ ======");
console.log(SortingLibrary.sortArray(denseArray, SortingLibrary.bubbleSort, true));
console.log(SortingLibrary.sortArray(denseArray, SortingLibrary.selectionSort, true));
console.log(SortingLibrary.sortArray(denseArray, SortingLibrary.insertionSort, true));
console.log(SortingLibrary.sortArray(denseArray, SortingLibrary.shellSort, true));
console.log(SortingLibrary.sortArray(denseArray, SortingLibrary.quickSort, true));

// Демонстрація на розрідженому масиві
console.log("\n====== ПРИКЛАД НА РОЗРІДЖЕНОМУ МАСИВІ ======");
console.log(SortingLibrary.sortArray(sparseArray, SortingLibrary.bubbleSort, false));
console.log(SortingLibrary.sortArray(sparseArray, SortingLibrary.selectionSort, false));
console.log(SortingLibrary.sortArray(sparseArray, SortingLibrary.insertionSort, false));
console.log(SortingLibrary.sortArray(sparseArray, SortingLibrary.shellSort, false));
console.log(SortingLibrary.sortArray(sparseArray, SortingLibrary.quickSort, false));
